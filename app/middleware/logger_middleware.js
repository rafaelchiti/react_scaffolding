import platform from "platform";

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  if (platform.name !== "IE") {
    console.group("[DISPATCH]:", action.type);
  } else {
    console.log("[DISPATCH]:", action.type);
  }

  console.info("|__ dispatching", action);
  let result = next(action);
  console.log("|__ next state", store.getState());

  if (platform.name !== "IE") {
    console.groupEnd(action.type);
  }

  return result;
};

export default logger;
