import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const untypedRequest = req as any;
  if (untypedRequest.isUnauthenticated() || !untypedRequest.user) {
    untypedRequest.session.oauth2return = req.originalUrl;
    res.redirect('/auth/login');
  } else {
    next();
  }
}
