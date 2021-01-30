import {
  SET_CHARACTERS,
  ADD_CHARACTER,
  UPDATE_CHARACTER,
  DELETE_CHARACTER,
  GET_ERRORS,
  CLEAR_ERRORS,
} from "./types"
import axios from "axios"
import { validateAddCharacter } from "../utils/validator"
import BASE_URL from "../utils/baseurl"

export const addCharacter = (characterData, history) => async (dispatch) => {
  console.log("ChaeactterData:", characterData)
  try {
    const errors = validateAddCharacter(characterData)
    console.log(errors)
    if (errors.name || errors.level || errors.race || errors.characterClass) {
      console.log("errorijtn")
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      })
      setTimeout(() => {
        // console.log("erroriactiontoimi")
        dispatch({
          type: CLEAR_ERRORS,
        })
      }, 5000)
    } else {
      const res = await axios.post(BASE_URL + "/api/characters", characterData)
      dispatch({
        type: ADD_CHARACTER,
        newCharacter: res.data,
      })
      console.log("Character added successfully")
      history.push("/home")
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateCharacter = (characterData, history) => async (dispatch) => {
  try {
    const res = await axios.put(
      BASE_URL + `/api/characters/${characterData._id}`,
      characterData
    )
    dispatch({
      type: UPDATE_CHARACTER,
      payload: res.data,
    })
    console.log("Character updated successfully")
    history.push("/home")
  } catch (err) {
    console.log(err)
  }
}

export const deleteCharacter = (id, history) => async (dispatch) => {
  // console.log("DeleteAction")
  try {
    const res = await axios.delete(BASE_URL + `/api/characters/${id}`)
    dispatch({
      type: DELETE_CHARACTER,
      payload: res.data._id,
    })
    // console.log("Character deleted successfully")
    history.push("/home")
  } catch (err) {
    console.log(err)
    // console.log('eroririririririr')
  }
}

export const getCharacters = () => async (dispatch) => {
  // console.log("GetCharacterAction")
  try {
    const res = await axios.get(BASE_URL + "/api/characters")
    // console.log(res)
    dispatch({
      type: SET_CHARACTERS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}
