import SessionTypes  from "app/action_types/session";
import matchesAction from "./utils/matches_action";
import * as ih       from "./utils/immutable_helpers";

const initialState = ih.immutable({
});

export default function sessionReducer (state = initialState, action) {
  return state;
}