import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./components/layouts/Navbar"
import SearchBar from "./components/layouts/SearchBar"
import Characters from "./components/characters/Characters"
import Character from "./components/characters/Character"
import Test from "./components/dungeonmaster/Test"
import Games from "./components/games/Games"
import Game from "./components/games/Game"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import CreateCharacter from "./components/create-character/CreateCharacter"
import DungeonMaster from "./components/dungeonmaster/DungeonMaster"
import "materialize-css/dist/css/materialize.min.css"
import M from "materialize-css/dist/js/materialize.min.js"
import "./App.css"

function App() {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit()
  })
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route
            exact
            path='/home'
            render={() => (
              <div className='container'>
                <SearchBar />
                <h1>
                  Welcome!{" "}
                  <span style={{ fontSize: "40px", color: "Mediumslateblue" }}>
                    <i className='fas fa-hat-wizard'></i>
                  </span>
                </h1>
                <Characters />
                <Games />
              </div>
            )}
          />

          <Route exact path='/test' component={Test} />
          <Route exact path='/character/:id' component={Character} />
          <Route exact path='/game/:id' component={Game} />
          <Route exact path='/create-character' component={CreateCharacter} />
          <Route exact path='/dungeonmaster' component={DungeonMaster} />
        </Switch>
      </Fragment>
    </Router>
  )
}

export default App
