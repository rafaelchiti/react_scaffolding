import React, {Component}         from "react";
import ReactDOM                   from "react-dom";
import {Router, useRouterHistory} from "react-router";
import { createHashHistory }      from "history";
import {Provider}                 from "react-redux";
import renderRoutes               from "app/views/routes";
import configureStore             from "app/store";

// Apply the base styles for ALL the app
import "app/assets/stylesheets/base";

// Make sure the static_content gets added to the bundle
import "app/assets/static_content";



const store = configureStore();

class Root extends Component {

  constructor(props) {
    super(props);
    this.history = useRouterHistory(createHashHistory)();
  }

  render () {
    return (
      <Provider store={store}>
        {renderRoutes(store, this.history)}
      </Provider>
    )
  }
}


ReactDOM.render(<Root/>, document.getElementById("reactApplication"))
