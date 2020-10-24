import axios, { setToken } from "../utils/axiosService"
import jwt_decode from "jwt-decode"
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_PLAYER } from "./types"
import {
  formatErrors,
  validateLogin,
  validateRegistration,
} from "../utils/validator"

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    const errors = validateRegistration(userData)
    if (errors.username || errors.password) {
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      })
      setTimeout(() => {
        // console.log("erroriactiontoimi")
        dispatch({
          type: CLEAR_ERRORS,
          // payload: null,
        })
      }, 5000)
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/players",
        userData
      )
      setToken(res.data.token)
      history.push("/home")
    }
  } catch (err) {
    console.log(err)
    if (err.response.data.errors) {
      const errors = formatErrors(err.response.data.errors)
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      })
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.msg,
      })
    }
  }
}

// Login get user token
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const errors = validateLogin(userData)
    // console.log("errors_1", errors)
    if (errors.username || errors.password) {
      dispatch({
        type: GET_ERRORS,
        payload: errors,
      })
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        })
      }, 5000)
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData
      )
      setToken(res.data.token)
      const decoded = jwt_decode(res.data.token)
      dispatch(setCurrentPlayer(decoded))
      history.push("/home")
    }
  } catch (err) {
    console.log("kakka", err)
    const errors = formatErrors(err.response.data.errors)
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    })
    setTimeout(() => {
      dispatch({
        type: CLEAR_ERRORS,
      })
    }, 5000)
  }
}

export const setCurrentPlayer = (decoded) => {
  return {
    type: SET_CURRENT_PLAYER,
    payload: decoded,
  }
}

export const logoutUser = () => (dispatch) => {
  // Remove token localStorage
  setToken(null)
  dispatch(setCurrentPlayer(null))
}
