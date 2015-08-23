import Types from "app/action_types/session";
import {storeToken} from "app/api/auth_token";

const initialState = {
  authenticating: false,
  authenticateError: null
};


export default function sessionReducer (state = initialState, action) {

  if (action.type === Types.AUTHENTICATE.request) {
    const newState = {authenticating: true};
    state = {...state, ...newState};
  }

  if (action.type === Types.AUTHENTICATE.done) {
    const newState = {authenticating: false};
    const token = action.apiResponse.token;
    storeToken(token);
    state = {...state, ...newState};
  }

  if (action.type === Types.AUTHENTICATE.fail) {
    const newState = {authenticateError: action.apiError, authenticating: false};
    state = {...state, ...newState};
  }

  return state;
}