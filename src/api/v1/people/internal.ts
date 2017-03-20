import { TPerson } from './type';
import { Model as PersonModel } from './Model';

export const getUser = (googleId: string, callback: (error: any, data: TPerson) => void) => {
  PersonModel
    .findOne({ googleId: googleId })
    .populate('participants')
    .exec((err, data: TPerson) => {
      if (!err) {
        if (data) {
          callback(undefined, data);
        } else {
          callback('Not found', undefined);
        }
      } else {
        callback(err, undefined);
      }
    });
};