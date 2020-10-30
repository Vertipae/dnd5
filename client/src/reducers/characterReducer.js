import {
  ADD_CHARACTER,
  SET_CHARACTERS,
  UPDATE_CHARACTER,
  DELETE_CHARACTER
} from "../actions/types"

const initialState = {
  characters: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CHARACTER:
      return {
        ...state,
        // [...state.characters] = old array action.newCharacter new object to be added to array
        characters: [...state.characters, action.newCharacter],
      }
      case DELETE_CHARACTER: 
      console.log('Delete Rducer')
      return {
        ...state,
        // Vanhasta listasta filtteröidään pois character, jonka id on annettu action.payloadina
        characters: state.characters.filter(character => character._id !== action.payload)
      }
      case SET_CHARACTERS:
        return {
          ...state,
          // Asetetaan listaksi annettu lista (korvataan vanha lista uudella annetulla listalla)
          characters: action.payload
        }
    default:
      return state
  }
}
