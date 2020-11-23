import React from "react"
import { useSelector } from "react-redux"

const Game = ({ match }) => {
  const game = useSelector(
    (state) =>
      state.games.games.filter((game) => game._id === match.params.id)[0]
  )
  const characters = useSelector((state) => state.characters.characters)
  const player = useSelector((state) => state.auth.player)

  // console.log(game)
  // console.log(character)
  if (!game || !characters) {
    return <div></div>
  }
  // console.log("Peli", game)
  return (
    <div className='container'>
      <div className='dragonIcon'>
        <i className='fas fa-dragon'></i>
      </div>
      <div className='row'>
        <div className='col s12 m5'>
          <div className='card-panel brown lighten-2'>
            <h6>Dungeon master</h6>
            <span className='white-text'>{game.dungeonmaster.username}</span>
            <h6>Game name</h6>
            <span className='white-text'>{game.name}</span>
            <h6>Your character in this game</h6>
            {/* Katsoo pelin characterit ja etsii listasta itselleen kuuluvat characterin vertailemalla char id:tä */}
            {game.characters.map((character, i) => {
              if (characters.some((char) => character._id === char._id)) {
                return (
                  <span key={i} className='white-text'>
                    {character.name}{" "}
                  </span>
                )
              }
            })}
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
    </div>
  )
}
export default Game
