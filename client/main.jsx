import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";
import { Router, Route, browserHistory } from "react-router";
import { Accounts, STATES } from "meteor/accounts-ui";

Meteor.startup(() => {
  render(<App> </App>, document.getElementById("react-target"));
});
