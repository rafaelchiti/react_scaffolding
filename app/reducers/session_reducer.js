import Types          from 'app/action_types/session';
import { storeToken } from 'app/api/auth_token';
import matchesAction  from './utils/matches_action';
import * as ih        from './utils/immutable_helpers';

const initialState = ih.immutable({
  authenticating: false,
  authenticationError: null,
  user: null
});


export default function sessionReducer(state = initialState, action) {
  if (matchesAction(action, Types.AUTHENTICATE.request)) {
    state = ih.set(state, 'authenticating', true);
  }

  if (matchesAction(action, Types.AUTHENTICATE.done)) {
    const token = action.apiResponse.token;
    storeToken(token);

    state = ih.set(state, 'authenticating', false);
    state = ih.set(state, 'user', action.apiResponse.user);
  }

  if (matchesAction(action, Types.AUTHENTICATE.fail)) {
    state = ih.set(state, 'authenticationError', action.apiError);
    state = ih.set(state, 'authenticating', false);
  }

  return state;
}
