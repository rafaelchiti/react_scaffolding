import {combineReducers} from 'redux';

import session from "./session_reducer";
import application from "./application_reducer";

const rootReducer = combineReducers({
  session,
  application
});

export default rootReducer;