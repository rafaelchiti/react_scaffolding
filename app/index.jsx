import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, hashHistory} from "react-router";
import {Provider} from "react-redux";
import renderRoutes from "app/views/routes";
import configureStore from "app/store";

// Apply the base styles for ALL the app
import "app/assets/stylesheets/base";

// Make sure the static_content gets added to the bundle
import "app/assets/static_content";



const store = configureStore();

class Root extends Component {

  render () {
    return (
      <Provider store={store}>
        {renderRoutes(hashHistory)}
      </Provider>
    )
  }
}


ReactDOM.render(<Root/>, document.getElementById("reactApplication"))
