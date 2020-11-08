// Todo: Create game
// List my games(as a dungeon master)
// Game characters

import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addGame } from "../../actions/gameActions"

const DungeonMaster = () => {
  const errors = useSelector((state) => state.errors)
  const games = useSelector((state) => state.games.games)
  const dispatch = useDispatch()
  const history = useHistory()

  const [name, setName] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const newGame = {
      name,
    }
    dispatch(addGame(newGame, history))
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className=''>
          <Link to='/create-game'>Create a full game</Link>
          <p>Quick start a new game</p>
        </div>
        <div className='input-field col s6'>
          <i className='material-icons prefix'>people</i>
          <input
            id='icon_prefix'
            type='text'
            className={errors.name ? "invalid" : ""}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Game Name</label>
          <button
            className='btn waves-effect waves-light green darken-3 myBtn'
            style={{ marginTop: "2em" }}
            type='submit'
            name='action'
          >
            Save
            <i className='material-icons right'>send</i>
          </button>
        </div>
      </form>

      <ul className='collection with-header'>
        <li className='collection-header brown lighten-5'>
          <h5>Your adventures</h5>
        </li>
        <li
          className='collection-item'
          style={{ fontSize: "1.1em", marginTop: "0.5em" }}
        >
          Tulossa
        </li>
      </ul>
    </div>
  )
}

export default DungeonMaster
