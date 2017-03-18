declare module "redux-oidc" {
  import { Store, Middleware, Reducer } from 'redux';
  import { Component } from 'react';

  type TUserManagerConfig = {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    authority: string;
    silent_redirect_uri?: string;
    automaticSilentRenew?: boolean;
    filterProtocolClaims: boolean;
    loadUserInfo: boolean;
  }
  type TUserManager = { signinRedirect: () => void };
  export const createUserManager: (config: TUserManagerConfig) => TUserManager;
  export class CallbackComponent extends Component<{ url: string, userManager: TUserManager, successCallback: () => void, errorCallback: () => void }, {}> { }

  const createOidcMiddleware: (userManager: TUserManager, shouldValidate: (state: any, action: any) => boolean, triggerAuthFlow: boolean, callbackRoute: string) => Middleware;

  export class OidcProvider extends Component<{ userManager: TUserManager, store: any }, {}> { }

  export const reducer: Reducer<any>;

  export default createOidcMiddleware;
}