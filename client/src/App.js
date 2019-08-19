import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
import SearchBar from "./components/layouts/SearchBar";
import Characters from "./components/characters/Characters";
import Games from "./components/games/Games";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <Fragment>
      <Navbar />
      <SearchBar />
      <h1>Welcome! Almost ready!</h1>
      <Characters />
      <Games />
    </Fragment>
  );
}

export default App;
