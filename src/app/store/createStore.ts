import { __DEV__ } from '../globals';
import { applyMiddleware, compose, createStore as reduxCreateStore, StoreEnhancer, GenericStoreEnhancer, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { makeRootReducer } from './reducers';
import { updateLocation } from './location';

export const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware: Middleware[] = [thunk];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers: {}[] = [];

  function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
  }

  let composeEnhancers: (enhancer: GenericStoreEnhancer, ...enhancers: {}[]) => StoreEnhancer<{}> = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = reduxCreateStore(
    makeRootReducer({}),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
