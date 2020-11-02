import { SET_GAMES, ADD_GAME } from '../actions/types'


const initialState = {
    games: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GAMES:
            return {
                ...state,
                games: action.payload
            }
        case ADD_GAME:
            console.log('ADD REDUCER')
            return {
                ...state,
                games: [...state.games, action.payload]
            }
    default:
        return state
    }
}