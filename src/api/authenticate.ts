import { Request, Response, NextFunction } from 'express';

export function authenticate(req: any, res: any, next: any) {
  if (req.isUnauthenticated() || !req.user) {
    req.session.oauth2return = req.originalUrl;
    res.redirect('/auth/login');
  } else {
    next();
  }
}
