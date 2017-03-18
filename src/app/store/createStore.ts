import { __DEV__ } from '../globals';
import { applyMiddleware, compose, createStore as reduxCreateStore, StoreEnhancer, GenericStoreEnhancer, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { History } from 'History';
import { routerMiddleware } from 'react-router-redux';
import { makeRootReducer } from './reducers';
import createOidcMiddleware from 'redux-oidc';
import { userManager } from '../globals';
import * as Oidc from 'oidc-client';

Oidc.Log.logger = console;

const oidcMiddleware = createOidcMiddleware(userManager, (state, action) => { console.log(state, action); return false; }, true, '/callback');

export const createStore = (initialState = {}, history: History) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware: Middleware[] = [oidcMiddleware, thunk, routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers: {}[] = [];

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

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
