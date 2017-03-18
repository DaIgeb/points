import { Store } from 'redux';

declare module 'redux' {
  export interface Store<S> {
    asyncReducers: any;
    unsubscribeHistory: any;
  }
}
