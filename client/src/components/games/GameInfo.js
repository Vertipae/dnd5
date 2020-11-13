// For DM to see
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "../../utils/axiosService"
// Todo: Tarina (Peruskuvaus, karttakuva), Muut pelaajat,

export default function GameInfo({ match }) {
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
            <span className='white-text'>{player.username}</span>
            <h6>Game name</h6>
            <span className='white-text'>{game.name}</span>
            <h6>Characters in this game</h6>
            <span className='white-text'>{game.name}</span>
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
          </div>
        </div>
      </div>

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
  )
}
