import { combineReducers, ReducersMapObject, Store, Reducer } from 'redux';
import { locationReducer } from './location';
// import { reducer as formReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers: ReducersMapObject): Reducer<{}> => {
  return combineReducers<{}>({
    location: locationReducer,
    //  form: formReducer,
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

