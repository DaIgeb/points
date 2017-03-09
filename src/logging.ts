import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const colorize = process.env.NODE_ENV !== 'production';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: colorize
    })
  ],
  expressFormat: true,
  meta: false
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: colorize
    })
  ]
});

export const error = winston.error;
export const warn = winston.warn;
export const info = winston.info;
export const log = winston.log;
export const verbose = winston.verbose;
export const debug = winston.debug;
export const silly = winston.silly;