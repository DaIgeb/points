import { push } from 'react-router-redux';
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
        dispatch(push('/events'));

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
  return (dispatch: (args: any) => void, getState: () => { oidc: any, events: TEventsState, people: TPerson[] }) => {
    const token = getState().oidc.user.id_token;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);


    const options = {
      method: 'GET',
      headers
    };
    const apiCall = fetch('/api/v1/events', options)
      .then((res) => res.json())
      .then((data) => ({ data }))
      .catch((error) => ({ error }));

    apiCall.then(data => console.log(data));
    return new Promise((resolve: () => void) => {
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
    action.payload._id = action.payload._id || state.events.reduce((prev, obj) => Math.max(obj._id, prev), 1) + 1;
    const events = [
      ...state.events.filter(e => e._id !== action.payload._id),
      action.payload
    ];
    events.sort((l, r) => l._id - r._id);

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
    _id: 1,
    date: new Date(2016, 2, 1),
    name: 'Rafz',
    points: 20,
    distance: 200,
    elevation: 2000,
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