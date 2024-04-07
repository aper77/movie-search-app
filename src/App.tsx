import React from "react";
import "../src/styles/App.css";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CurrentMoviePage from "./components/MovieDetailsPage/CurrentMovie";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movie/:IMDB_ID">
            <CurrentMoviePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
