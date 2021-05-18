import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Layout, Main } from '../index'

export function Routers() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={ Main } />
        <Route exact path='/:roomId' component={ Layout } />
        {/* <Route path='/chat/:chatId' component={ Layout } /> */}
      </Switch>
    </Router>
  );
}