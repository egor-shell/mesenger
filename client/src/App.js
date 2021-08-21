import { React } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";

import './App.css';
import { AppRouter } from "components";

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
