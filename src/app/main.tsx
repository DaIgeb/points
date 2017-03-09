import { __DEV__ } from './globals';
import { AppContainer } from './containers/AppContainer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from './store/createStore';
import { createRoutes } from './routes/index';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// ========================================================
// Store Instantiation
// ========================================================
const initialState = (window as any).___INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = createRoutes(store);

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error: any) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();