import {Schema} from './Schema';
import {model as model} from 'mongoose';

export const Model = model('Event', Schema);