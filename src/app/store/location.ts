import { browserHistory } from 'react-router';
import { LocationListener, Location } from 'history';

type TAction = { type: string, payload: Location };
type TState = Location;
// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange(location: Location = browserHistory.createLocation('/')): TAction {
  return {
    type: LOCATION_CHANGE,
    payload: location
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }: { dispatch: (arg: TAction) => void }) : LocationListener => {
  return (nextLocation: Location) => dispatch(locationChange(nextLocation));
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: TState = null;
export function locationReducer(state = initialState, action: TAction) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state;
}
