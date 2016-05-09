import { isString } from 'lodash';

/*
* Returns true if there is any match, either a sync action
* or the action provided matches one of the sub types of an async action.
* This means that matchesAction(Types.ASYNC_ACTION) will match
* ASYNC_ACTION.request, ASYNC_ACTION.done, ASYNC_ACTION.fail.
*
*/
export default function matchesAction(action, actionTest) {
  if (isString(actionTest)) {
    if (action.type === actionTest) {
      return true;
    } else {
      return false;
    }
  }

  if (action.type === actionTest.request) {
    return true;
  }

  if (action.type === actionTest.done) {
    return true;
  }

  if (action.type === actionTest.fail) {
    return true;
  }

  return false;
}
