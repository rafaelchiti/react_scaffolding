/*
* Simple helper for creating async action types.
* For each type provided an object with the request / done / fail
* version is gonna be provided.
*/
export default function createAsyncActionsTypes(types) {
  if (!Array.isArray(types)) {
    throw new Error('Expecting types to be an array of constants');
  }

  const augmentedTypes = {};

  types.forEach((type) => {
    augmentedTypes[type] = {
      request: `${type}_REQUEST`,
      done: `${type}_DONE`,
      fail: `${type}_FAIL`
    };
  });

  return augmentedTypes;
}
