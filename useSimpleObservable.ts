import { useCallback, useRef } from 'react';
import type { Subscriber, Notifier, Unsubscribe, Observer, Observable } from './Observable';
import { SimpleObservable } from './Observable';

export const useSimpleObservable = <T>(): Observable<T> => {
  const observable = useRef<SimpleObservable<T>>(new SimpleObservable<T>());
  
  const subscribe = useCallback((observer: Observer<T>): Unsubscribe => {
    return observable.current.subscribe(observer);
  }, []);

  const notify = useCallback((value?: T): void => {
    observable.current.notify(value);
  }, []);

  return { subscribe, notify };

};
