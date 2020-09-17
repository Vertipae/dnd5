import axios, {setToken} from "../utils/axiosService"
import jwt_decode from "jwt-decode"
import { SET_CURRENT_PLAYER } from "./types"

export const registerUser = async (userData, history ) => dispatch => {
    try {
        const res = await axios.post('api/players', userData)
        setToken(res.data.token)
        history.push('/home')
    } catch(err) {
        // dispatch({})
        console.log(err)
    }
}

// Login get user token
export const loginUser = async (userData) => dispatch => {
    try {
        const res = await axios.post('api/auth/login', userData)
        setToken(res.data.token)
        const decoded = jwt_decode(token)
        dispatch(setCurrentPlayer(decoded))
        history.push('/home')
    } catch(err) {
        console.log(err)
    }
}

export const setCurrentPlayer = decoded => {
    return {
        type: SET_CURRENT_PLAYER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    // Remove token localStorage
    setToken(null)
    dispatch(setCurrentPlayer(null))
}