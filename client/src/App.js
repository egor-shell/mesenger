import { React } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import './App.css';
import { Routers } from "components"

function App() {

  return (
    <Router>
      <Switch>
          <Routers />
      </Switch>
    </Router>
  );
}

export default App;
