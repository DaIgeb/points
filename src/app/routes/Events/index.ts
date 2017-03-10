import { PlainRoute, RouterState, RouteComponent } from 'react-router';
import { injectReducer } from '../../store/reducers';
type ComponentCallback = (err: any, component: RouteComponent) => any;

const createDetailRoute: (store: any) => PlainRoute = (store) => ({
  path: ':id',
  getComponent(nextState: any, cb: any) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    (require as any).ensure([], (require: (module: string) => any) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Event: any = require('./containers/EventsContainer').Container;
      const reducer: any = require('./modules/events').reducer;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'events', reducer });

      /*  Return getComponent   */
      cb(null, Event);

      /* Webpack named bundle   */
    }, 'events');

    return undefined;
  }
});

const createIndexRoute: (store: any) => PlainRoute = (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState: RouterState, cb: any) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    (require as any).ensure([], (require: (module: string) => any) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Events: any = require('./containers/EventsContainer').Container;
      const reducer: any = require('./modules/events').reducer;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'events', reducer });

      /*  Return getComponent   */
      cb(null, Events);

      /* Webpack named bundle   */
    }, 'events');

    return undefined;
  }
});

export const createEventsRoute = (store: any): PlainRoute => ({
  path: 'events',
  indexRoute: createIndexRoute(store),
  childRoutes: [createDetailRoute(store)]
});
