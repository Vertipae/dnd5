import axios, { setToken } from "../utils/axiosService"
import jwt_decode from "jwt-decode"
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_PLAYER,
  SET_CHARACTERS,
  SET_GAMES,
} from "./types"
import {
  formatErrors,
  validateLogin,
  validateRegistration,
} from "../utils/validator"

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://vankiloitajalohkuja.herokuapp.com"
    : "http://localhost:5000"

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
      const res = await axios.post(BASE_URL + "/api/players", userData)
      setToken(res.data.token)
      // Log player in after registration
      const decoded = jwt_decode(res.data.token)
      // console.log(decoded)
      dispatch(setCurrentPlayer(decoded.player))
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
export const loginUser = (userData, history, redirect = "/home") => async (
  dispatch
) => {
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
        BASE_URL + "/api/auth/login",
        // Se body
        userData
      )
      setToken(res.data.token)
      const decoded = jwt_decode(res.data.token)
      dispatch(setCurrentPlayer(decoded.player))
      if (redirect) history.push(redirect)
    }
  } catch (err) {
    console.log("err", err)
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
  // console.log(decoded)
  return {
    type: SET_CURRENT_PLAYER,
    payload: decoded,
  }
}

export const logoutUser = () => (dispatch) => {
  // Remove token localStorage
  setToken(null)
  dispatch(setCurrentPlayer(null))
  dispatch({
    type: SET_CHARACTERS,
    payload: [],
  })
  dispatch({
    type: SET_GAMES,
    payload: [],
  })
}
