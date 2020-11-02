import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import characterReducer from "./characterReducer"
import gameReducer from './gameReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  characters: characterReducer,
  games: gameReducer,
})
