import createAsyncActionsTypes from "./utils/create_async_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "INITIALIZE_SESSION",
  "LOGOUT"
]);

export default {...AsyncTypes};
