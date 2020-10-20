import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"
// Note to self withRouter doesn't work with functional components
// Perhaps they work

const Register = () => {
  const auth = useSelector((state) => state.auth)
  const errors = useSelector((state) => state.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordTwo, setPasswordTwo] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    const newPlayer = {
      username,
      password,
      passwordTwo,
      errors: {},
    }

    dispatch(registerUser(newPlayer, history))
  }

  useEffect(() => {
    if (auth.player) {
      // Cheking that if the user is logged in
      // If thats true then redirect player to home
      history.push("/home")
    }
    // eslint-disable-next-line
  }, [])
  console.log(errors)
  return (
    <div className="container">
      {/* {errors.length > 0 && <h1>KAKKA</h1>} */}
      <form onSubmit={onSubmit}>
        <h1>Register</h1>

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

        <TextFieldGroup
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          className="input-field my-inputfield"
          type="password"
          name="passwordTwo"
          label="Confirm password"
          error={errors.password}
        />

        <button
          className="btn waves-effect waves-light brown myBtn"
          style={{ marginTop: "2em" }}
          type="submit"
          name="action"
          disabled={password !== passwordTwo && password.length === 0}
        >
          Register
          <i className="material-icons right">send</i>
        </button>
        <div>
          <Link
            to="/"
            className="btn waves-effect waves-light brown myBtn"
            style={{ marginTop: "2em" }}
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
