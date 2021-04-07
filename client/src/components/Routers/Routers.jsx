import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Layout from '../Layout/Layout';
import Demo from '../demo'

function Routers() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={ Layout } />
        <Route path='/chat/:chatId' component={ Demo } />
      </Switch>
    </Router>
  );
}
export default Routers;