import React from "react"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className='container'>
      <form>
        <h1>Sign in</h1>
        <label>Username</label>
        <input
          className='input-field my-inputfield'
          type='text'
          name='username'
          required
        />
        <label>Password</label>
        <input
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
        >
          Login
          <i className='material-icons right'>send</i>
        </button>
        <div>
          <Link
            to='/register'
            className='btn waves-effect waves-light brown'
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
