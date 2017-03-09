import {Schema} from './Schema';
import {model} from 'mongoose';

export const Model = model('Person', Schema);

