import Types from "app/action_types/session";

import {
  fetchSession as fetchSessionCall,
} from "app/api/api_calls";


export function initializeSession () {
  return {
    type: Types.INITIALIZE_SESSION,
    callAPI: () => fetchSessionCall()
  };
}
