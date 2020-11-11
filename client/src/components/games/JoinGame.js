import React from "react"
import { useSelector } from "react-redux"

export default function JoinGame({ match }) {
  // Filtteröi peleistä pelin, jonka id on sama kuin urlin id ja ottaa listasta ensimmäisen
  const game = useSelector(
    (state) =>
      state.games.games.filter((game) => game._id === match.params.id)[0]
  )

  const player = useSelector((state) => state.auth.player)
  const characters = useSelector((state) => state.characters.characters)
  //   console.log(game)
  if (!game) {
    return <div></div>
  }

  return (
    <div className='container'>
      <div className='dragonIcon'>
        <i className='fas fa-dragon'></i>
      </div>

      <div className='row'>
        <div className='col s12 m5'>
          <div className='card-panel brown lighten-2'>
            <h6>Dungeonmaster</h6>
            <span className='white-text'>{player.username}</span>
            <h6>Game name</h6>
            <span className='white-text'>{game.name}</span>
          </div>
        </div>
        {/*  */}
        <div className='col s12 m5'>
          <div className='card-panel brown lighten-2'>
            <h6> Game description</h6>
            <span className='white-text'>
              I am a very simple card. I am good at containing small bits of
              information. I am convenient because I require little markup to
              use effectively. I am similar to what is called a panel in other
              frameworks. I am a very simple card. I am good at containing small
              bits of information. I am convenient because I require little
              markup to use effectively. I am similar to what is called a panel
              in other frameworks.
            </span>
          </div>
        </div>
      </div>
      <label className='joinGameHeader'>
        Choose a character to join a game
      </label>
      <select className='browser-default'>
        {characters.map((character) => (
          <option key={character._id} value=''>
            {character.name}, {character.race} {character.characterClass}
          </option>
        ))}
      </select>
      <div className='row right'>
        <button
          className='btn waves-effect waves-light green darken-4 myBtn'
          style={{ marginTop: "2em" }}
          type='submit'
          name='action'
        >
          Join
          <i className='material-icons right'>send</i>
        </button>
      </div>
    </div>
  )
}
