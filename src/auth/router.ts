import { Router } from 'express';
import * as passport from 'passport';

export const router = Router();

// TODO display login/register page
router.get('/login', (req, res) => {
  if (req.query.return) {
    (req as any).session.oauth2return = req.query.return;
  }

  res.redirect('google');
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email'] })
);
/*
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    const redirect = (req as any).session.oauth2return || '/';
    delete (req as any).session.oauth2return;

    res.redirect(redirect);
  }
);*/

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google/success', (req, res) => res.status(200).send('Success' + JSON.stringify(req.user)));
router.get('/google/failure', (req, res) => res.status(200).send('failure'));