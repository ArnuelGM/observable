export class SimpleObservable {
  constructor() {
    this.observers = new Map();
  }
  subscribe(observer) {
    const observerId = crypto.randomUUID();
    this.observers.set(observerId, observer);
    return () => this.observers.delete(observerId);
  }
  notify(value) {
    this.observers.forEach((observer) => observer(value));
  }
}
