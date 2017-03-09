import { TPersonUnloaded } from './type';
import { Model as PersonModel } from './Model';
import { Router } from 'express';

export const router = Router();

router.get('', (req, res) => {
  const filterDefined = req.query.hasOwnProperty('firstName') || req.query.hasOwnProperty('lastName') || req.query.hasOwnProperty('email');
  const query = filterDefined ? PersonModel.find(req.query).populate('events') : PersonModel.find();
  query.exec((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post('', (req, res) => {
  const person = req.body as TPersonUnloaded;
  if (person.hasOwnProperty('_id')) {
    res.status(400).json({ message: 'Use PUT or PATCH to update an existing item' });
    return;
  }
  new PersonModel(person).save((err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
});

