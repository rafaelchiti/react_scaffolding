import React, {PropTypes, Component}                   from 'react'
import {Router, Route, Link}                           from "react-router";
import HashHistory                                     from "react-router/lib/HashHistory";
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider}                                      from "react-redux";
import renderRoutes                                    from "app/views/routes";
import loggerMiddleware                                from "app/middleware/logger_middleware";
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
  loggerMiddleware
)(createStore);

let store = createStoreWithMiddleware(combinedReducers);


class Root extends Component {

  constructor(props) {
    super(props);
    this.history = new HashHistory();
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
