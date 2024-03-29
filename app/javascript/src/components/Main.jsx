import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { either, isEmpty, isNil } from "ramda";

import { initializeLogger } from "common/logger";
import {
  setAuthHeaders,
  registerIntercepts,
  resetAuthTokens,
} from "apis/axios";
import { PageLoader } from "@bigbinary/neetoui";
import Dashboard from "components/Dashboard";
import EUI from "components/EUI";

import PrivateRoute from "components/Common/PrivateRoute";
import PasswordReset from "components/Authentication/ResetPassword";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Plans from "components/Authentication/Plans";

import { useAuthState, useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { ParticipantProvider } from "contexts/participant";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuthState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const dashboardPaths = ["/", "/contacts", "/settings", "/room"];

  useEffect(() => {
    initializeLogger();
    registerIntercepts(authDispatch);
    if (props.user) {
      userDispatch({ type: "SET_USER", payload: { user: props.user } });
    } else {
      authDispatch({ type: "LOGOUT" });
      resetAuthTokens();
    }
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/my/password/new" component={PasswordReset} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signup/plans" component={Plans} />
        <Route exact path="/login" component={Login} />
        {dashboardPaths.includes(window.location.pathname) && (
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        )}
        <Route path="/:room">
          <ParticipantProvider>
            <EUI />
          </ParticipantProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
