export type Observer<T> = (value?: T) => void;
export type Notifier<T> = (value?: T) => void;
export type Unsubscribe = () => void
export type Subscriber<T> = (observer: Observer<T>) => Unsubscribe;

export interface Observable<T> {
  subscribe: Subscriber<T>;
  notify: Notifier<T>;
}

export class SimpleObservable<T = void> implements Observable<T> {
  private observers: Set<Observer<T>>;
  constructor() {
    this.observers = new Set();
  }
  public subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
  public notify(value?: T): void {
    this.observers.forEach(observer => observer(value));
  }
}
