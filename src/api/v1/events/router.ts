import { TEventWithParticipants } from './type';
import { Model as EventModel } from './Model';
import { Model as PersonModel } from '../people/Model';
import { Router, Request } from 'express';

export const router = Router();

router.get('', (req, res) => {
  const query = buildEventQuery(req);
  query.exec((err, data) => {
    if (!err) {
      res.status(200).json(data);
    } else {
      res.status(500).json(err);
    }
  });
});

router.get('/:id', (req, res) => {
  EventModel
    .find({
      _id: req.params.id
    })
    .populate('participants')
    .exec((err, data) => {
      if (!err) {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404);
        }
      } else {
        res.status(500).json(err);
      }
    });
});

router.post('', (req, res) => {
  const event = req.body as TEventWithParticipants;
  const participants = event.participants.slice();
  delete (event.participants);

  const mongoEvent = new EventModel(event);
  mongoEvent.save((err, data) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    if (participants.length > 0) {
      const promises: Promise<Document>[] = participants.map((p: any) => findOrCreateParticipant(p, (err, data) => { console.log(err, data); }));
      Promise.all(promises)
        .then(particpantData => {
          for (const document of particpantData) {
            (data as any).participants.push(document);
            (document as any).events.push(data);
            (document as any).save(() => { });
          }
        })
        .then(() => {
          data.save((err, data) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(data);
            }
          });
        })
        .catch(err => res.status(500).json(err));
    } else {
      res.status(200).json(mongoEvent);
    }
  });
});

function createPersonQuery(part: any) {
  if (part.hasOwnProperty('_id')) {
    return PersonModel.findOne({ _id: part._id });
  }

  return PersonModel.findOne(part);
}

function findOrCreateParticipant(part: any, cb: (err: any, data: any) => void): Promise<Document> {
  return new Promise((res: any, rej: any) => {
    createPersonQuery(part).exec((err, data) => {
      if (err) {
        cb(err, null);
        rej(err);
      } else if (data) {
        cb(null, data);
        res(data);
      } else {
        const entry = new PersonModel(part);
        entry.save((err, data) => {
          cb(err, data);
          if (err) {
            rej(err);
          } else {
            res(data);
          }
        });
      }
    });
  });
}

function buildEventQuery(req: Request) {
  let result;
  if (req.query.hasOwnProperty('year')) {
    const minDate = new Date(req.query.year, 0, 1);
    const maxDate = new Date(req.query.year, 11, 31);
    result = EventModel.find({
      date: { $lt: maxDate, $gt: minDate }
    });
  } else {
    result = EventModel.find();
  }

  result.populate('participants');

  return result;
}
