import { CustomPromise }      from 'app/utils/custom_promise';
import { isString, isObject } from 'lodash';

/*
* Middleware to accept actions like:
* To accept async actions.
* An async action is an action that has a type with the shape:
* type: {request: requestType, done: doneType, fail: failType}
* If the action type is provided has the shape shown above it will be
* treated as an async action and dispatch the request version and then
* execute the api call provided on the action.
*
* If the action type is a string then is treated as a sync action.
*/
export default function callAPIMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const {
        type,
        callAPI,
        shouldCallAPI = () => true,
        // Default to an empty object but let user provide
        // here the parameters used during dispatch in case they are required
        // by the DONE or FAIL action.
        payload = {}
      } = action;

      if (!type) {
        throw new Error('Not type provided for the action');
      }

      // Validate the type provided
      if (isString(type)) {
        if (callAPI) {
          throw new Error(`The action: [${type}] was dispatched as a sync action but provided an Api Call, which is not coherent`);
        }
        // This is a sync action, just dispatch and return.
        return next(action);
      }

      if (isObject(type)) {
        if (!isString(type.request)) throw new Error(`Action type.request is expected to be a String. The value provided was: [${type.request}]`);
        if (!isString(type.done)) throw new Error(`Action type.request is expected to be a String. The value provided was: [${type.request}]`);
        if (!isString(type.fail)) throw new Error(`Action type.request is expected to be a String. The value provided was: [${type.request}]`);
      } else {
        throw new Error('Action type was expected to be an Object or a String.');
      }

      // We are in presence of a async action, therefore validate it has a
      // api call.
      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return;
      }


      dispatch({ payload: payload, type: type.request });


      // Always return a 'resolved' promise. This means that we don't need
      // to use .catch or .then(null, errorHandler) when consuming the result
      // of the dispatch. This also means that now everytime you attach to
      // .then when calling .dispatch() you need to check if the result was
      // an expected negative flow or a positive flow, you can eaily do that
      // by checking on the params .then((result) => result.error) f.i.
      return callAPI().then(
        (result) => CustomPromise.resolve(dispatch({ payload: payload, apiResponse: result.apiResponse, type: type.done })),
        (result) => CustomPromise.resolve(dispatch({ payload: payload, apiError: result.apiError, type: type.fail }))
      );
    };
  };
}
