import React                   from "react";
import { Router, Route, Link } from "react-router";

import ApplicationContainer    from "app/views/containers/application_container";
import SecuredContentContainer from "app/views/containers/secured_content_container";
import LoginContainer          from "app/views/containers/login_container";
import HomeContainer           from "app/views/containers/home_container";


export default function renderRoutes(store, history, requireAuth) {

  return (
    <Router history={history}>
      <Route path="/" component={ApplicationContainer}>

        <Route component={SecuredContentContainer} onEnter={requireAuth} >
          <Route path="home" component={HomeContainer} />
        </Route>

        <Route path="login" component={LoginContainer} />

      </Route>
    </Router>
  );
};

