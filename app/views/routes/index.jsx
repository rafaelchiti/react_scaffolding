import React                           from "react";
import {Route, Redirect}               from "react-router";

import ApplicationContainer            from "app/views/containers/application_container";
import SecuredContentContainer         from "app/views/containers/secured_content_container";
import LoginContainer                  from "app/views/containers/login_container";
import HomeContainer                   from "app/views/containers/home_container";

if (module.hot) {
  // Don't hot reload the routes, do a refresh instead
  module.hot.decline();
}

const routes =
    <Route>
        <Redirect from="/" to="/home" />
        <Route path="/" component={ApplicationContainer}>

          <Route component={SecuredContentContainer} >
            <Route path="home" component={HomeContainer} />
          </Route>

          <Route path="login" component={LoginContainer} />
        </Route>
    </Route>;

export default routes;

