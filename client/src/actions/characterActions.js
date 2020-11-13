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

export const addCharacter = (characterData, history) => async (dispatch) => {
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
        console.log("erroriactiontoimi")
        dispatch({
          type: CLEAR_ERRORS,
        })
      }, 5000)
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/characters",
        characterData
      )
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
      `http://localhost:5000/api/characters/${characterData._id}`,
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
  console.log("DeleteAction")
  try {
    const res = await axios.delete(`http://localhost:5000/api/characters/${id}`)
    dispatch({
      type: DELETE_CHARACTER,
      payload: res.data._id,
    })
    console.log("Character deleted successfully")
    history.push("/home")
  } catch (err) {
    console.log(err)
    // console.log('eroririririririr')
  }
}

export const getCharacters = () => async (dispatch) => {
  console.log("GetCharacterAction")
  try {
    const res = await axios.get("http://localhost:5000/api/characters")
    // console.log(res)
    dispatch({
      type: SET_CHARACTERS,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}
