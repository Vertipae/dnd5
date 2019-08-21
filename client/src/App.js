import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import SearchBar from "./components/layouts/SearchBar";
import Characters from "./components/characters/Characters";
import Character from "./components/characters/Character";
import Test from "./components/dungeonmaster/Test";
import Games from "./components/games/Games";
import Game from "./components/games/Game";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <div className='container'>
                <SearchBar />
                <h1>Welcome! Almost ready!</h1>
                <Characters />
                <Games />
              </div>
            )}
          />

          <Route exact path='/test' component={Test} />
          <Route exact path='/player/:id' component={Character} />
          <Route exact path='/game/:id' component={Game} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
