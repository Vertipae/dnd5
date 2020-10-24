import {
  ADD_CHARACTER,
  SET_CHARACTERS,
  UPDATE_CHARACTER,
} from "../actions/types"

const initialState = {
  characters: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHARACTER:
      return {
        ...state,
        characters: [...state.characters, action.newCharacter],
      }
    default:
      return state
  }
}
