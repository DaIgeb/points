import { router as v1Router } from './v1/router';
import { Router } from 'express';
import * as passport from 'passport';

export const router = Router();
// Add cors
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

router.use('/v1', v1Router);

