import { SET_GAMES, ADD_GAME, GET_ERRORS, CLEAR_ERRORS } from "./types"
import axios from "axios"
import { validateAddGame } from "../utils/validator"

// Ei tartte id tai gamesData parametria, koska axios middleware lähettää tokenin automaattisesti
export const getGames = () => async (dispatch) => {
  console.log("GetGamesAction")
  try {
    const res = await axios.get("http://localhost:5000/api/games")
    dispatch({
      type: SET_GAMES,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const addGame = (gameData, history) => async (dispatch) => {
  try {
    const errors = validateAddGame(gameData)
    console.log(errors)
    if (errors.name) {
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      })
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        })
      }, 5000)
    } else {
      const res = await axios.post("http://localhost:5000/api/games", gameData)
      dispatch({
        type: ADD_GAME,
        payload: res.data,
      })
      console.log("Game added successfully")
      history.push("/home")
    }
  } catch (err) {
    console.log(err)
  }
}
