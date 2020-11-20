// For DM to see
import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { deleteGame } from "../../actions/gameActions"
// Todo: Tarina (Peruskuvaus, karttakuva), Muut pelaajat,
// Ehtolause jos DM näyttää  DM jutut

export default function GameInfo({ match }) {
  const dispatch = useDispatch()
  const history = useHistory()
  // Filtteröi peleistä pelin, jonka id on sama kuin urlin id ja ottaa listasta ensimmäisen
  const game = useSelector(
    (state) =>
      state.games.games.filter((game) => game._id === match.params.id)[0]
  )
  const player = useSelector((state) => state.auth.player)
  const characters = useSelector((state) => state.characters.characters)

  // Räyh
  if (!game) {
    return <div></div>
  }

  return (
    <div className='container'>
      <div className='dragonIcon'>
        <i className='fas fa-dragon'></i>
      </div>

      <div className='row'>
        <div className='col s6'>
          <div className='card-panel brown lighten-2'>
            <h6>Dungeon master</h6>
            <span
              className='white-text'
              style={{ textTransform: "capitalize" }}
            >
              {game.dungeonmaster.username}
            </span>
            <h6>Game name</h6>
            <span
              className='white-text'
              style={{ textTransform: "capitalize" }}
            >
              {game.name}
            </span>
            <h6>Characters in this game</h6>
            {game.characters.map((character) => (
              <span className='white-text'>{character.name} - </span>
            ))}
          </div>
        </div>

        <div className='col s6'>
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

      <div className='row'>
        <div className='col s12'>
          <div className='card-panel brown lighten-2'>
            <h6> Share this invite to people to join:</h6>
            <span className='white-text'>
              {`http://localhost:3000/joingame/${game._id}?secret=${game.secret}`}
            </span>
            <button
              className='waves-effect waves-light btn-small'
              style={{ marginLeft: "3.5em", backgroundColor: "mediumpurple" }}
              onClick={() =>
                navigator.clipboard.writeText(
                  `http://localhost:3000/joingame/${game._id}?secret=${game.secret}`
                )
              }
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className='col '>
        <button
          className='btn waves-effect waves-light red darken-4 myBtn'
          style={{ marginTop: "2em" }}
          type='submit'
          name='action'
          onClick={(e) => {
            e.preventDefault()
            dispatch(deleteGame(game._id, history))
          }}
        >
          Delete
          <i className='material-icons right'>delete</i>
        </button>
      </div>
    </div>
  )
}
