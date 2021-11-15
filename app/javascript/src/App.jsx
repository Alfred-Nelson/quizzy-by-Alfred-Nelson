import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import PublicPage from "components/Common/PublicPage";
import Container from "components/Container";
import Login from "components/Login";
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
      <Switch>
        <Route exact path="/public/:slug" component={PublicPage} />
        <Container isLoggedIn={isLoggedIn}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute
              path="/"
              redirectRoute="/login"
              condition={isLoggedIn}
            />
          </Switch>
        </Container>
      </Switch>
    </Router>
  );
};

export default App;
