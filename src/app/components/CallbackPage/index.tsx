import * as React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { push } from 'react-router-redux';
import {userManager} from '../../globals';

class CallbackPageComponent extends React.Component<{ push: (args: string) => void }, {}> {
  successCallback = (user: any) => {
    this.props.push('/');
  }

  errorCallback = () => {
    this.props.push('/events');
  }

  render() {
    return (
      <CallbackComponent userManager={userManager} successCallback={this.successCallback} errorCallback={this.errorCallback} >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }
}

export const CallbackPage =  connect(() => ({}), { push })(CallbackPageComponent);