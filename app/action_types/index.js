import env from "app/utils/env";

const list = [
  require("./session"),
];


/*
* Export the merged list of action types.
*/
export default list.reduce((result, actionTypes) => tryMerge(result, actionTypes), {});



/**
* Little helper only for Dev, just throw if we find an Action that already exists
* just to make easier the development.
*/
function tryMerge (obj, newObj) {

  if (env.isDev) {
    Object.keys(newObj).forEach(type => {
      if (obj[type]) throw new Error(`ActionType: [${type}] already exists`);
    });
  }

  return {...obj, ...newObj};
}
