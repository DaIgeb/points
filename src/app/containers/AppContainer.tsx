import * as React from 'react';
import { Component, PropTypes } from 'react';
import { browserHistory, Router, PlainRoute } from 'react-router';
import { Provider, Store } from 'react-redux';

export class AppContainer extends Component<{ routes: PlainRoute, store: Store<any> }, {}> {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory} children={routes} />
      </Provider>
    );
  }
}
