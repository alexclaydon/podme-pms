import React from "react";
import Navbar from "../Common/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Contacts from "./Contacts";
import Room from "./Room";
import Settings from "./Settings";

const Dashboard = () => {
  return (
    <div className="relative flex flex-col items-start justify-start w-screen h-screen">
      <Navbar />
      <Switch>
        <Route path="/contacts" component={Contacts} />
        <Route path="/rooms" component={Room} />
        <Route path="/settings" component={Settings} />
        <Redirect exact from="/" to="/contacts" />
      </Switch>
    </div>
  );
};

export default Dashboard;
