import { getUser } from './api/v1/people/internal';
import * as passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as jwt from 'jsonwebtoken';
import * as config from './config';
import 'fetch-everywhere';

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
        try {
          const profile = jwt.decode(token);
          fetch(`https://www.googleapis.com/oauth2/v2/tokeninfo?id_token=${token}`)
            .then(data => data.json())
            .then((data: any) => {
              if (data.issued_to === profile.azp && data.audience === profile.aud && data.user_id === profile.sub) {
                getUser(profile.sub as string, (err, data) => {
                  const scope = [];
                  if (data) {
                    if (data.isAdmin) {
                      scope.push('admin');
                    }
                    if (data.isPointAdmin) {
                      scope.push('pointAdmin');
                    }
                    if (data.isUser) {
                      scope.push('user');
                    }
                  }
                  done(err, { id_token: token, profile: profile, data, person: data }, { message: 'read', scope: scope });
                });
              } else {
                done('No valid token', null);
              }
            });
        } catch (err) {
          done(err, null);
        }
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
};