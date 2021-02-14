import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { Home, SignIn, Layout, Config } from "../../components";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home">
        <Route component={Layout(Home)} />
      </Route>
      <Route path="/signin">
        <Route component={SignIn} />
      </Route>
      <Route path="/configuracion">
        <Route component={Layout(Config)} />
      </Route>
    </Switch>
  </main>
);

export default Main;
