import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "components/Dashboard";
import Report from "components/Dashboard/Report";
import Edit from "components/Questions/Edit";
import Make from "components/Questions/Make";
import Create from "components/Quiz/Create";
import Show from "components/Quiz/Show";

const PrivateRoute = ({ condition, path, redirectRoute, ...props }) => {
  if (!condition) {
    return (
      <Redirect
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return (
    <Switch>
      <Route exact path="/quiz/create" component={Create} />
      <Route exact path="/quiz/:id/show" component={Show} />
      <Route exact path="/quiz/:id/add/question" component={Make} />
      <Route exact path="/question/:id/edit" component={Edit} />
      <Route exact path="/report" component={Report} />
      <Route path={path} component={Dashboard} {...props} />
    </Switch>
  );
};

export default PrivateRoute;
