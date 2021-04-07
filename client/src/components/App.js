import { React } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import './App.css';
// import Initial from './Main/Initial'
import Routers from "./Routers/Routers";

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
