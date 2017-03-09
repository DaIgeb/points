import {router as eventsRouter} from './events/router';
import {router as peopleRouter} from './people/router';
import {router as yearsRouter} from './years/router';
import {Router} from 'express';

export const router = Router();
router.use('/people', peopleRouter);
router.use('/events', eventsRouter);
router.use('/years', yearsRouter);

