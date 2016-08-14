import Types from 'app/action_types/session';

import {
  authenticate as authenticateCall
} from 'app/api/api_calls';

export function authenticate (email, password) {
  return {
    type: Types.AUTHENTICATE,
    callAPI: () => authenticateCall({ email, password })
  };
}
