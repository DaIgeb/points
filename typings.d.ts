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