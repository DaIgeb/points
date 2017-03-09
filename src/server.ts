import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import { Schema, connection, model, connect } from 'mongoose';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as path from 'path';
import * as passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as jwt from 'jsonwebtoken';

import * as logging from './logging';
import { router as apiRouter } from './api/router';
import { router as authRouter } from './auth/router';
import * as config from './config';


const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config.SESSION_SECRET,
  signed: true
};

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

const app = express();

app.use(logging.requestLogger);
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter);
app.use('/auth', authRouter);

const clientPath = path.resolve(__dirname + '/../static');
app.use(express.static(clientPath));
app.use((req, res) => res.sendFile(path.join(clientPath, 'index.html')));

app.use(logging.errorLogger);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).send(err.response || 'Something broke!');
});

(<any>mongoose).Promise = global.Promise;
const connectionString = process.env.db || 'mongodb://localhost/test';
connect(connectionString);

connection.on('error', (args: string[]) => logging.error('connection error:', args));
connection.once('open', () => {
  http.createServer(app).listen(app.get('port'), () => {
    logging.info('Express server listening on port ' + app.get('port'));
  });
});