import {Schema as MongooseSchema} from 'mongoose';

export const Schema = new MongooseSchema({
  name: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    min: 0,
    required: true
  },
  elevation: {
    type: Number,
    min: 0,
    required: true
  },
  points: {
    type: Number,
    min: 0,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  participants: [{ type: MongooseSchema.Types.ObjectId, ref: 'Person' }]
});

Schema.index({ date: 1, name: 1 }, { unique: true });