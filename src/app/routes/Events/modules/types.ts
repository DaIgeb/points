export type TEventState = {
  id: number;
  date: Date;
  name: string;
  points: number;
  distance: number;
  participants: TEventParticipant[]
};

export type TEventParticipant = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TPerson = TEventParticipant & {
  id: number;
};

export type TEventsState = {
    events: TEventState[]
};

export type TGlobalState = {
    event: TEventState;
    events: TEventsState;
    people: TPerson[];
};