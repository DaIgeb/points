import { Schema as MongooseSchema } from 'mongoose';

export const Schema = new MongooseSchema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  isMember: {
    type: Boolean,
    required: true,
  },
  events: [{ type: MongooseSchema.Types.ObjectId, ref: 'Event' }]
});

Schema.index({ firtName: 1, lastName: 1 }, { unique: true });