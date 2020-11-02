import { SET_GAMES, ADD_GAME } from './types'
import axios from 'axios'

// Ei tartte id tai gamesData parametria, koska axios middleware lähettää tokenin automaattisesti
export const getGames = () => async (dispatch) => {
    console.log('GetGamesAction')
    try {
        const res = await axios.get("http://localhost:5000/api/games")
        dispatch({
            type: SET_GAMES,
            payload: res.data
        })
    } catch(err) {
        console.log(err)
    }
}

export const addGame = (gameData, history) => async (dispatch) => {
    try {
        const res = await.post(
            "http://localhost:5000/api/games",
            gameData
          )
          dispatch({
              type: ADD_GAME,
              payload: res.data
          })
          console.log('Game added successfully')
          history.push('/home')
    }catch(err) {
        console.log(err)
    }
}