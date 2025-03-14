export class SimpleObservable {
  constructor() {
    this.observers = new Set();
  }
  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
  notify(value) {
    this.observers.forEach(observer => observer(value));
  }
}
