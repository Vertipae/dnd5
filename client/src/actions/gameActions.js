import {
  SET_GAMES,
  ADD_GAME,
  GET_ERRORS,
  CLEAR_ERRORS,
  DELETE_GAME,
} from "./types"
import axios from "axios"
import { validateAddGame } from "../utils/validator"
import BASE_URL from "../utils/baseurl"

// Ei tartte id tai gamesData parametria, koska axios middleware lähettää tokenin automaattisesti
export const getGames = () => async (dispatch) => {
  // console.log("GetGamesAction")
  try {
    const res = await axios.get(BASE_URL + "/api/games")
    // console.log("GET_GAMES:", res.data)
    dispatch({
      type: SET_GAMES,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const addGame = (gameData, history, quick) => async (dispatch) => {
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
      const res = await axios.post(BASE_URL + "/api/games", gameData)
      dispatch({
        type: ADD_GAME,
        payload: res.data,
      })
      console.log("Game added successfully")
      if (!quick) history.push("/home")
    }
  } catch (err) {
    console.log(err)
  }
}

export const joinGame = (gameId, characterId, history) => async (dispatch) => {
  try {
    if (!characterId || characterId === "") {
      dispatch({
        type: GET_ERRORS,
        payload: { characterSelect: "No character selected" },
      })
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        })
      }, 5000)
    } else {
      const res = await axios.post(
        // se body {character: characterId}
        BASE_URL + `/api/games/join/${gameId}`,
        { character: characterId }
      )
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

export const deleteGame = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(BASE_URL + `/api/games/${id}`)
    dispatch({
      type: DELETE_GAME,
      payload: res.data._id,
    })
    console.log("Game deleted successfully")
    history.push("/dungeonmaster")
  } catch (err) {
    console.log(err)
  }
}
