import { SET_CURRENT_PLAYER } from "../actions/types"

const initialState = {
  player: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PLAYER:
      // console.log(action)
      return {
        ...state,
        player: action.payload,
      }
    default:
      return state
  }
}
