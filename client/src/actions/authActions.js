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