import { verbose } from './logging';
import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import { Schema, connection, model, connect } from 'mongoose';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as path from 'path';
import * as passport from 'passport';

import * as logging from './logging';
import { router as apiRouter } from './api/router';
import { router as authRouter } from './auth/router';
import * as config from './config';
import { setup as setupPassport } from './passport';

import * as webpack from 'webpack';
import * as webpackMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import { config as webpackConfig } from './webpack.config';

const isDeveloping = process.env.NODE_ENV !== 'production';

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config.SESSION_SECRET,
  signed: true
};

setupPassport();

const app = express();

app.set('port', process.env.PORT || 3001);
app.set('hostIp', process.env.HOSTIP || '127.0.0.1');

app.use(logging.requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter);
app.use('/auth', authRouter);


if (isDeveloping) {
  try {
    const compiler = webpack(webpackConfig);

    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
      quiet: false,
      noInfo: false
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  } catch (err) {
    console.error(err.message, err);
  }
} else {
  const clientPath = path.resolve(__dirname + '/../static');
  app.use(express.static(clientPath));
  app.use((req, res) => res.sendFile(path.join(clientPath, 'index.html')));
}
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
  const port = app.get('port');
  const hostIp = app.get('hostIp');
  http.createServer(app).listen(port, hostIp, () => {
    logging.info(`==> 🌎 Listening on port ${port}. Open up http://${hostIp}:${port}/ in your browser.`);
  });
});