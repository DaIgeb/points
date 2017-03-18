// We only need to import the modules necessary for initial render
import { CoreLayout } from '../layouts/CoreLayout';
import { IndexRoute as Home } from './Home';
import { createEventsRoute } from './Events';
import { CallbackPage } from '../components/CallbackPage';
import { Store } from 'react-redux';
import { PlainRoute } from 'react-router';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store: Store<any>): PlainRoute => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    createEventsRoute(store),
    {
      path: 'callback',
      component: CallbackPage
    },
    {
      path: 'auth/google/callback',
      component: CallbackPage
    }
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/
