import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Container from "components/Container";
import Dashboard from "components/Dashboard";
import Login from "components/Login";
import Edit from "components/Questions/Edit";
import Make from "components/Questions/Make";
import Create from "components/Quiz/Create";
import Show from "components/Quiz/Show";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    registerIntercepts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Container isLoggedIn={isLoggedIn}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/quiz/create" component={Create} />
          <Route exact path="/quiz/:id/show" component={Show} />
          <Route exact path="/quiz/:id/add/question" component={Make} />
          <Route exact path="/question/:id/edit" component={Edit} />
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
