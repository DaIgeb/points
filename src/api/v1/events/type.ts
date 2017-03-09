import { TPersonUnloaded } from '../people/type';

type TEventCore = {
  _id: any;
  name: string;
  date: Date;
  points: number;
  distance: number;
  elevation: number;
};

export type TEvent = TEventCore & {
  participants: {
    _id: any
  } & Partial<TPersonUnloaded>[]
};

export type TEventUnloaded = TEventCore & {
  participants: {
    _id: any
  }[]
};

export type TEventWithParticipants = TEventCore & {
  participants: TPersonUnloaded[]
};