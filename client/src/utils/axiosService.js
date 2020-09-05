// Purpose of this file is to add authorization to token on every requests when user is logged in
import axios from "axios"

const init = () => {
  const token = window.localStorage.getItem("accessToken")
  setToken(token)
}

export const setToken = (token) => {
  if (token) {
    window.localStorage.setItem("accessToken", token)
    axios.defaults.headers.common["x-auth-token"] = token
  } else {
    window.localStorage.removeItem("accessToken")
    delete axios.defaults.headers.common["x-auth-token"]
  }
}

init()

export default axios
