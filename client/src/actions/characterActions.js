import { SET_CHARACTERS, ADD_CHARACTER, UPDATE_CHARACTER, DELETE_CHARACTER } from "./types"
import axios from "axios"

export const addCharacter = (characterData, history) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/characters",
      characterData
    )
    dispatch({
      type: ADD_CHARACTER,
      newCharacter: res.data,
    })
    console.log("Character added successfully")
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
      payload: res.data._id
    })
    console.log("Character deleted successfully")
  } catch(err) {
    console.log(err)
    // console.log('eroririririririr')
  }
}

export const getCharacters = () => async (dispatch) => {
  console.log("GetCharacterAction")
  try {
    const res = await axios.get("http://localhost:5000/api/characters")
    dispatch({
      type: SET_CHARACTERS,
      payload: res.data
    })
  } catch(err){
    console.log(err)
  }
}
