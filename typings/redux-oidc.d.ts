declare module "redux-oidc" {
  import { Store, Middleware, Reducer } from 'redux';
  import { Component } from 'react';
  import {UserManager, UserManagerSettings} from 'oidc-client';

  export const createUserManager: (config: UserManagerSettings) => UserManager;
  export class CallbackComponent extends Component<{ userManager: UserManager, successCallback: (user: any) => void, errorCallback: () => void }, {}> { }

  const createOidcMiddleware: (userManager: UserManager, shouldValidate: (state: any, action: any) => boolean, triggerAuthFlow: boolean, callbackRoute: string) => Middleware;

  export class OidcProvider extends Component<{ userManager: UserManager, store: any }, {}> { }

  export const reducer: Reducer<any>;

  export default createOidcMiddleware;
}