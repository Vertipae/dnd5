import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "../../utils/axiosService"
import Login from "../auth/Login"

import { joinGame } from "../../actions/gameActions"
// Todo: Näytä punanen korostus errori, jos hahmo on liittyny peliin
// Todo: luo hahmo vaihtoehto, jos ei ole hahmoa

export default function JoinGame({ match, location }) {
  // Filtteröi peleistä pelin, jonka id on sama kuin urlin id ja ottaa listasta ensimmäisen
  // const game = useSelector(
  //   (state) =>
  //     state.games.games.filter((game) => game._id === match.params.id)[0]
  // )

  const auth = useSelector((state) => state.auth)

  const [game, setGame] = useState(null)
  const secret = new URLSearchParams(location.search).get("secret")
  // console.log(secret)
  // const player = useSelector((state) => state.auth.player)
  const characters = useSelector((state) => state.characters.characters)
  const [character, setCharacter] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()
  console.log(history.location)
  const onSubmit = () => {
    dispatch(joinGame(game._id, character, history))
  }

  const getGame = async () => {
    try {
      const game = await axios.get(
        `http://localhost:5000/api/games/${match.params.id}/${secret}`
      )
      setGame(game.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getGame()
  }, [auth])
  // console.log(game)

  const notAuthed = () => {
    if (!auth.player) {
      return (
        // <Login redirect={history.location.pathname + history.location.search} />
        <Login redirect={false} />
      )
    }
  }
  // Palauttaa tyhjän kunnes peli on haettu
  const authLinks = !game ? (
    <div></div>
  ) : (
    <div className='container'>
      <div className='dragonIcon'>
        <i className='fas fa-dragon'></i>
      </div>

      <div className='row'>
        <div className='col s12 m6'>
          <div className='card-panel brown lighten-2'>
            <h6>Dungeon master</h6>
            <span className='white-text'>{game.dungeonmaster.username}</span>
            <h6>Game name</h6>
            <span className='white-text'>{game.name}</span>
          </div>
        </div>
        {/*  */}
        <div className='col s12 m6'>
          <div className='card-panel brown lighten-2'>
            <h6> Game description</h6>
            <span className='white-text'>{game.description}</span>
          </div>
        </div>
      </div>
      <label className='joinGameHeader'>
        Choose a character to join a game
      </label>
      <select
        className='browser-default'
        onChange={(e) => setCharacter(e.target.value)}
        defaultValue=''
      >
        <option value='' disabled>
          Choose your character
        </option>
        {characters.map((character) => (
          <option key={character._id} value={character._id}>
            {character.name}, {character.race} {character.characterClass}
          </option>
        ))}
      </select>
      <div className='row right'>
        <button
          onClick={onSubmit}
          className='btn waves-effect waves-light green darken-4 myBtn'
          style={{ marginTop: "2em" }}
          type='submit'
          name='action'
          disabled={character === ""}
        >
          Join
          <i className='material-icons right'>send</i>
        </button>
      </div>
    </div>
  )
  // console.log(game)
  return <div>{auth.player ? authLinks : notAuthed()}</div>
}
