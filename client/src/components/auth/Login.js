import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

const Login = () => {
  const auth = useSelector((state) => state.auth)
  const errors = useSelector((state) => state.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username,
      password,
      errors: {},
    }

    dispatch(loginUser(userData, history))
  }

  useEffect(() => {
    // console.log(auth)
    if (auth.player) {
      history.push("/home")
    }
    // eslint-disable-next-line
  }, [auth])

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign in</h1>
        <TextFieldGroup
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field my-inputfield"
          type="text"
          name="username"
          label="Username"
          error={errors.username}
        />

        <TextFieldGroup
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field my-inputfield"
          type="password"
          name="password"
          label="Password"
          error={errors.password}
        />

        <button
          className="btn waves-effect waves-light brown myBtn"
          style={{ marginTop: "2em" }}
          type="submit"
          name="action"
        >
          Login
          <i className="material-icons right">send</i>
        </button>
        <div>
          <Link
            to="/register"
            className="btn waves-effect waves-light brown myBtn"
            style={{ marginTop: "2em" }}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
