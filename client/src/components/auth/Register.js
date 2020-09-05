import React from "react"
import { Link } from "react-router-dom"
// Todo history withRouter

const Register = () => {
  return (
    <div className='container'>
      <form>
        <h1>Register</h1>
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
        <label>Confirm password</label>
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
