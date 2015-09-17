import React, {PropTypes, Component}                   from 'react'
import {Router, Route, Link}                           from "react-router";
import createHashHistory                               from 'history/lib/createHashHistory';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider}                                      from "react-redux";
import renderRoutes                                    from "app/views/routes";
import createLogger                                    from 'redux-logger';
import asyncActionsMiddleware                          from "app/middleware/async_actions_middleware";
// Reducers
import * as reducers                                   from "app/reducers";

// Apply the base styles for ALL the app
import "app/assets/stylesheets/base";

// Make sure the static_content gets added to the bundle
import "app/assets/static_content";

const combinedReducers = combineReducers(reducers);

let createStoreWithMiddleware = applyMiddleware(
  asyncActionsMiddleware,
  createLogger({
    predicate: (getState, action) => process.env.NODE_ENV !== "production"
  })
)(createStore);

let store = createStoreWithMiddleware(combinedReducers);


class Root extends Component {

  constructor(props) {
    super(props);
    this.history = createHashHistory();
  }

  render () {
    return (
      <Provider store={store}>
        {() => renderRoutes(store, this.history)}
      </Provider>
    )
  }
}


React.render(<Root/>, document.getElementById("reactApplication"))
