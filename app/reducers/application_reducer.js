import SessionTypes from "app/action_types/session";


const initialState = {
  isInitializingSession: false,
  sessionValid: false,
  initializingSessionError: null
};

export default function sessionReducer (state = initialState, action) {

  if (action.type === SessionTypes.INITIALIZE_SESSION.request) {
    const newState = {isInitializingSession: true, sessionValid: false};
    state = {...state, ...newState};
  }

  if (action.type === SessionTypes.INITIALIZE_SESSION.done) {
    const newState = {isInitializingSession: false, sessionValid: true};
    state = {...state, ...newState};
  }

  if (action.type === SessionTypes.INITIALIZE_SESSION.fail) {
    const newState = {isInitializingSession: false, sessionValid: false, initializingSessionError: action.apiError};
    state = {...state, ...newState};
  }

  return state;
}