import { SET_CHARACTERS, ADD_CHARACTER, UPDATE_CHARACTER } from "./types"
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
