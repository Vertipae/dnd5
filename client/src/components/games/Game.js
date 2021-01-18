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
        <div className='col s12 m6'>
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
            <h6> Game description</h6>
            <span className='white-text'>{game.description}</span>
          </div>
        </div>
        {/* Piirtää kuvan, jos ehto täyttyy ei enään erroria gameFile.type */}
        {game.gameFile && (
          <img
            className='uploadImg'
            src={`data:${game.gameFile.type};base64,${atob(
              game.gameFile.data
            )}`}
            alt='uploaded'
          />
        )}
        {/*  */}
        {/* <div className='col s12 m6'>
          <div className='card-panel brown lighten-2'>
            <h6> Game description</h6>
            <span className='white-text'>{game.description}</span>
          </div>
        </div> */}
      </div>
      {/* Piirtää kuvan, jos ehto täyttyy ei enään erroria gameFile.type
      {game.gameFile && (
        <img
          className='uploadImg'
          src={`data:${game.gameFile.type};base64,${atob(game.gameFile.data)}`}
          alt='uploaded'
        />
      )} */}
    </div>
  )
}
export default Game
