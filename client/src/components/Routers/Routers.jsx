import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Layout from '../Layout/Layout';
import Main from '../Main/Initial.js'

function Routers() {

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={ Main } />
        <Route exact path='/chat' component={ Layout } />
        <Route path='/chat/:chatId' component={ Layout } />
      </Switch>
    </Router>
  );
}
export default Routers;