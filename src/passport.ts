import * as passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as jwt from 'jsonwebtoken';

import * as config from './config';

export const setup = () => {
  const options = {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CLIENT_CALLBACK_URL
  };
  passport.use(
    new GoogleStrategy(
      options,
      (accessToken, refreshToken, profile, done) => {
        done(null, { googleId: profile.id });
      }
    )
  );

  passport.use(
    new BearerStrategy(
      function (token, done) {
        done(null, { access_token: token }, { message: 'read', scope: 'read' });
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    const token = jwt.sign(user, config.JWT_SECRET, { expiresIn: '2h' });

    done(null, token);
  });

  passport.deserializeUser((user: string, done) => {
    try {
      if (jwt.verify(user, config.JWT_SECRET)) {
        return done(null, user);
      }
    }
    catch (error) {
    }

    done('invalid user', null);
  });
}