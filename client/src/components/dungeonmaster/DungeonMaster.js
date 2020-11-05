// Todo: Create game
// List my games(as a dungeon master)
// Game characters

import React from "react"
import { Link } from "react-router-dom"

const DungeonMaster = () => {
  return (
    <div className='container'>
      <form>
        <div className=''>
          <Link to='/create-game'>Create a full game</Link>
          <p>Quick start a new game</p>
        </div>
        <div className='input-field col s6'>
          <i className='material-icons prefix'>people</i>
          <input id='icon_prefix' type='text' />
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
