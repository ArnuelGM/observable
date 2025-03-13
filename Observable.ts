export type Unsubscribe = () => void;
export type Notifier<T> = (value?: T) => void;
export type Observer<T> = (value?: T) => void;
export type Subscriber<T> = (observer: Observer<T>) => Unsubscribe;

export interface Observable<T> {
  subscribe: Subscriber<T>;
  notify: Notifier<T>;
}

export class SimpleObservable<T> implements Observable<T> {
  private observers: Map<string, Observer<T>>;
 
  constructor() {
    this.observers = new Map<string, Observer<T>>();
  }
 
  subscribe(observer: Observer<T>): Unsubscribe {
    const observerId = crypto.randomUUID();
    this.observers.set(observerId, observer);
    return () => this.observers.delete(observerId);
  }
 
  notify(value?: T): void {
    this.observers.forEach((observer) => observer(value));
  }
}
