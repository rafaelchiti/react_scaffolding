import Types from "app/action_types/session";
import {storeToken} from "app/api/auth_token";

const initialState = {
  authenticating: false,
  authenticationError: null,
  user: null
};


export default function sessionReducer (state = initialState, action) {

  if (action.type === Types.AUTHENTICATE.request) {
    const newState = {authenticating: true};
    state = {...state, ...newState};
  }

  if (action.type === Types.AUTHENTICATE.done) {
    const newState = {authenticating: false, user: action.apiResponse.user};
    const token = action.apiResponse.token;
    state = {...state, ...newState};
    storeToken(token);
  }

  if (action.type === Types.AUTHENTICATE.fail) {
    const newState = {authenticationError: action.apiError, authenticating: false};
    state = {...state, ...newState};
  }

  return state;
}