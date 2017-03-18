interface NodeRequire {
  ensure: (modules: string[], cb: (require: (module: string) => any) => void, modulename: string) => void;
}

declare module "mongoose-api" {
  import * as express from "express";

  export function serveModels(app: express.Express): void;
}

declare module "express-winston" {
  type TLogger = (req: any, res: any, next: any) => void;
  type TLoggerOptions = {
    transports: any[];
    expressFormat?: boolean;
    meta?: boolean;
  }
  type TLoggerCreation = (options: TLoggerOptions) => TLogger;

  export const logger: TLoggerCreation;
  export const errorLogger: TLoggerCreation;
}

declare interface NodeModule {
  hot: any
}

/*
declare module "react-router-redux" {
  import * as R from 'redux';
  import * as H from 'HistoryModule';

  const TRANSITION: string;
  const UPDATE_LOCATION: string;

  const push: PushAction;
  const replace: ReplaceAction;
  const go: GoAction;
  const goBack: GoForwardAction;
  const goForward: GoBackAction;
  const routeActions: RouteActions;

  type LocationDescriptor = H.Location | H.Path;
  type PushAction = (nextLocation: LocationDescriptor) => void;
  type ReplaceAction = (nextLocation: LocationDescriptor) => void;
  type GoAction = (n: number) => void;
  type GoForwardAction = () => void;
  type GoBackAction = () => void;

  interface RouteActions {
    push: PushAction;
    replace: ReplaceAction;
    go: GoAction;
    goForward: GoForwardAction;
    goBack: GoBackAction;
  }
  interface HistoryMiddleware extends R.Middleware {
    listenForReplays(store: R.Store<any>, selectLocationState?: Function): void;
    unsubscribe(): void;
  }

  function routeReducer(state?: any, options?: any): R.Reducer<any>;
  function syncHistory(history: H.History): HistoryMiddleware;
}
/*
declare module "react-router-redux" {
  export = ReactRouterRedux;
}*/
