import React, { Fragment, useEffect } from "react";
import Navbar from "./components/layouts/Navbar";
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
      <h1>Welcome!</h1>
    </Fragment>
  );
}

export default App;
