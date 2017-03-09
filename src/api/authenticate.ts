import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (req.isUnauthenticated() || !req.user) {
    req.session.oauth2return = req.originalUrl;
    res.redirect('/auth/login');
  } else {
    next();
  }
}
