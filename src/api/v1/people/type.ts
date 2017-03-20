import { TEventUnloaded } from '../events/type';

type TPersonCore = {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  isMember: boolean;
  isAdmin: boolean;
  isPointAdmin: boolean;
  isUser: boolean;
  googleId: string;
};

export type TPerson = TPersonCore & {
  events: {
    _id: any
  } & Partial<TEventUnloaded>[]
};

export type TPersonUnloaded = TPersonCore & {
  events: {
    _id: any
  }[]
};

export type TPersonWithEvents = TPersonCore & {
  events: TEventUnloaded[]
};