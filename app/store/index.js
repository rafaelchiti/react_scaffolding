import { createStore, applyMiddleware } from 'redux';
import createLogger                     from 'redux-logger';
import rootReducer                      from 'app/reducers';
import asyncActionsMiddleware           from 'app/middleware/async_actions_middleware';


const createStoreWithMiddleware = applyMiddleware(
  asyncActionsMiddleware,
  createLogger({
    predicate: (getState, action) => process.env.NODE_ENV !== 'production'
  })
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('app/reducers', () => {
      const nextRootReducer = require('app/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
