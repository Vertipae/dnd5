import React, { Fragment, useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom"
import jwt_decode from "jwt-decode"
import { setToken } from "./utils/axiosService"
import Navbar from "./components/layouts/Navbar"
import SearchBar from "./components/layouts/SearchBar"
import Characters from "./components/characters/Characters"
import Character from "./components/characters/Character"
import Settings from "./components/settings/Settings"
import Games from "./components/games/Games"
import Game from "./components/games/Game"
import CreateGame from "./components/games/CreateGame"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import CreateCharacter from "./components/create-character/CreateCharacter"
import DungeonMaster from "./components/dungeonmaster/DungeonMaster"
import "materialize-css/dist/css/materialize.min.css"
import M from "materialize-css/dist/js/materialize.min.js"
import "./App.css"
import WelcomeBar from "./components/layouts/WelcomeBar"
import { setCurrentPlayer, logoutUser } from "./actions/authActions"
import { useDispatch, useSelector } from "react-redux"
import { getCharacters } from "./actions/characterActions"
import { getGames } from "./actions/gameActions"
import GameInfo from "./components/games/GameInfo"
import JoinGame from "./components/games/JoinGame"

function App() {
  const dispatch = useDispatch()
  const player = useSelector((state) => state.auth.player)
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    // console.log(localStorage.accessToken)
    // Check for token from localStorage (logic for refreshing the page so the token doesn't disappear)
    if (localStorage.accessToken) {
      // Set auth token header auth
      setToken(localStorage.accessToken)
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.accessToken)
      // Set user and isAuthenticated
      // console.log(decoded)
      dispatch(setCurrentPlayer(decoded.player))

      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // If the expiration time is less than the current time
        // Logout user
        dispatch(logoutUser())
        // // TODO: Clear current profile
        // store.dispatch(clearCurrentProfile())
        // // Redirect to login
        // window.location.href = "/"
        history.push("/")
      }
    } else {
      history.push("/")
    }
  }, [])

  useEffect(() => {
    // console.log(location.pathname)
    if (location.pathname === "/") return
    if (localStorage.accessToken) {
      // Set auth token header auth
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.accessToken)
      // Set user and isAuthenticated
      // console.log(decoded)
      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // If the expiration time is less than the current time
        // Logout user
        dispatch(logoutUser())
        // // TODO: Clear current profile
        // store.dispatch(clearCurrentProfile())
        // // Redirect to login
        // window.location.href = "/"
        history.push("/")
      }
    } else {
      history.push("/")
    }
  }, [location])

  useEffect(() => {
    // If player is not logged in, do nothing
    if (!player) return
    // Get data from backend to Redux immediately on first render
    dispatch(getCharacters())
    dispatch(getGames())
  }, [player])
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit()
  })
  return (
    // <Router>
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
              <div className='dragonIcon'>
                <i className='fas fa-dragon'></i>
              </div>
              <SearchBar />
              <WelcomeBar />

              <Characters />
              <Games />
            </div>
          )}
        />

        <Route exact path='/character/:id' component={Character} />
        <Route exact path='/game/:id' component={Game} />
        <Route exact path='/game-info/:id' component={GameInfo} />
        <Route exact path='/create-character' component={CreateCharacter} />
        <Route exact path='/dungeonmaster' component={DungeonMaster} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/create-game' component={CreateGame} />
        <Route exact path='/joingame/:id' component={JoinGame} />
      </Switch>
    </Fragment>
    // </Router>
  )
}

export default App
