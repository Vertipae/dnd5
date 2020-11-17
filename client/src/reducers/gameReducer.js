import { SET_GAMES, ADD_GAME, DELETE_GAME } from "../actions/types"

const initialState = {
  games: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GAMES:
      return {
        ...state,
        games: action.payload,
      }
    case ADD_GAME:
      // console.log('ADD REDUCER')
      return {
        ...state,
        games: [...state.games, action.payload],
      }
    case DELETE_GAME:
      return {
        ...state,
        // Vanhasta listasta filtteröidään pois peli, jonka id on annettu action.payloadina
        games: state.games.filter((game) => game._id !== action.payload),
      }

    default:
      return state
  }
}
