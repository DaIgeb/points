import { updateLocation, locationChange } from '../../../store/location';
import { browserHistory } from 'react-router';
import { TEventState, TEventsState, TEventParticipant, TPerson } from './types';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';
export const EVENTS_SAVE_EVENT = 'EVENTS_SAVE_EVENT';
export const EVENTS_LOADED = 'EVENTS_LOADED';

// ------------------------------------
// Actions
// ------------------------------------
export const saveEvent = (event: {
  date: Date;
  name: string;
  points: string;
  distance: string;
  participants: TEventParticipant[]
}) => {
  return (dispatch: (args: any) => void, getState: () => { events: TEventsState, people: TPerson[] }) => {
    return new Promise((resolve: () => void) => {
      setTimeout(() => {
        dispatch({
          type: EVENTS_SAVE_EVENT,
          payload: {
            ...event,
            distance: parseFloat(event.distance),
            points: parseInt(event.points),
          }
        });
        browserHistory.push('/events');

        const newPeople = event.participants.filter((p: any) => Object.keys(p).indexOf('user') === -1);
        for (let i = 0; i < newPeople.length; i++) {
          console.log('add person', {
            firstName: newPeople[i].firstName,
            lastName: newPeople[i].lastName,
            email: newPeople[i].email
          }); // (dispatch, getState);
        }

        resolve();
      }, 200);
    });
  };
};

export const loadEvents = () => {
  return (dispatch: (args: any) => void, getState: () => { events: TEventsState, people: TPerson[] }) => {
    return new Promise((resolve: () => void) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/api/v1/events');
      request.onreadystatechange = (xhr) => {
        console.log('New state', xhr);
      };
      request.send();
      setTimeout(() => {
        dispatch({
          type: EVENTS_LOADED,
          payload: initialState.events
        });

        resolve();
      }, 200);
    });
  };
};

export const actions = {
  saveEvent,
  loadEvents
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EVENTS_SAVE_EVENT]: (state: TEventsState, action: { payload: TEventState }) => {
    action.payload.id = action.payload.id || state.events.reduce((prev, obj) => Math.max(obj.id, prev), 1) + 1;
    const events = [
      ...state.events.filter(e => e.id !== action.payload.id),
      action.payload
    ];
    events.sort((l, r) => l.id - r.id);

    return {
      ...state,
      events
    };
  },
};

type TActionType = 'EVENTS_SAVE_EVENT';
// ------------------------------------
// Reducer
// ------------------------------------
const initialState: TEventsState = {
  events: [{
    id: 1,
    date: new Date(2016, 2, 1),
    name: 'Rafz',
    points: 20,
    distance: 200,
    participants: [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com'
    }]
  }]
};

export const reducer = function counterReducer(state = initialState, action: { type: TActionType, payload: TEventState }): TEventsState {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};