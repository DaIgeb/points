import { combineReducers, ReducersMapObject, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer } from 'redux-oidc';

export const makeRootReducer = (asyncReducers: ReducersMapObject): Reducer<{}> => {
  return combineReducers<{}>({
    routing: routerReducer,
    oidc: reducer,
    ...asyncReducers
  });
};

export const injectReducer = (store: any, injectedReducer: { key: string, reducer: Reducer<any> }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, injectedReducer.key)) {
    return;
  }

  store.asyncReducers[injectedReducer.key] = injectedReducer.reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

