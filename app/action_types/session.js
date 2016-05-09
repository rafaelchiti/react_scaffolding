import createAsyncActionsTypes from './utils/create_async_actions_types';

const AsyncTypes = createAsyncActionsTypes([
  'AUTHENTICATE'
]);

export default { ...AsyncTypes };
