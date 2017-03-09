import { Model as EventModel } from '../events/Model';
import { Router } from 'express';

export const router = Router();
router.get('/:year', (req, res) => {
  const minDate = new Date(req.params.year, 0, 1);
  const maxDate = new Date(req.params.year, 11, 31);
  EventModel.find({
    date: { $lt: maxDate, $gt: minDate }
  }).populate('participants').exec((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

