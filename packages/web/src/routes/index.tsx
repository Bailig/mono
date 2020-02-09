import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Todo } from "./todo";

export const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/todo" component={Todo} exact />
      </Switch>
    </Router>
  );
};
