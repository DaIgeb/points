import * as React from 'react';
import { Component, PropTypes } from 'react';
import { Router, PlainRoute } from 'react-router';
import { History } from 'History';
import { Provider, Store } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import {userManager} from '../globals';

export class AppContainer extends Component<{ routes: PlainRoute, store: Store<any>, history: History }, {}> {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { routes, store, history } = this.props;

    return (
      <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
          <Router history={history} children={routes} />
        </OidcProvider>
      </Provider>
    );
  }
}
