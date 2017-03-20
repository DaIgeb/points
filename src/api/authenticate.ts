
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

export const requireRole = (...role: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const untypedRequest = req as any;
  if (untypedRequest.isUnauthenticated()) {
    return res.status(401).end();
  }
  if (!untypedRequest.user) {
    return res.status(401).end();
  }

  const hasRole = role.some(r => untypedRequest.authInfo.scope.indexOf(r) >= 0);

  if (hasRole) {
    next();
  } else {
    return res.status(403).end();
  }
};
