import React, { useState, useEffect} from "react"
import { Link,useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../actions/authActions'
// Note to self withRouter doesn't work with functional components

const Register = () => {
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')


  const onSubmit = (e) => {
    e.preventDefault()

    const newPlayer = {
      username,
      password,
      passwordTwo
    }
    
  dispatch(registerUser(newPlayer, history))
  }

  useEffect(() => {
    if (auth.player) {
      // Cheking that if the user is logged in
      // If thats true then redirect player to home
      history.push("/home");
    }
  }, [])

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <input
        value={username}
        onChange={e => setUsername(e.target.value)}
          className='input-field my-inputfield'
          type='text'
          name='username'
          required
        />
        <label>Password</label>
        <input
        value={password}
        onChange={e => setPassword(e.target.value)}
          className='input-field my-inputfield'
          type='password'
          name='password'
          required
        />
        <label>Confirm password</label>
        <input
        value={passwordTwo}
        onChange={e => setPasswordTwo(e.target.value)}
          className='input-field my-inputfield'
          type='password'
          name='password'
          required
        />

        <button
          className='btn waves-effect waves-light brown'
          style={{ marginTop: "2em" }}
          type='submit'
          name='action'
          disabled={password !== passwordTwo && password.length === 0}
        >
          Register
          <i className='material-icons right'>send</i>
        </button>
        <div>
          <Link
            to='/'
            className='btn waves-effect waves-light brown'
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