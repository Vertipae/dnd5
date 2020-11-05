// import { addListener } from "nodemon"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, withRouter, useHistory } from "react-router-dom"
import { logoutUser } from "../../actions/authActions"

const Navbar = (props) => {
  // console.log(props.location.pathname);
  // console.log(props);

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const history = useHistory()

  const onLogoutClick = () => {
    dispatch(logoutUser())
    history.push("/")
  }

  const authLinks = (
    <nav>
      <div className='nav-wrapper brown'>
        <div
          className='left'
          style={{
            marginLeft: "15px",
            display: "flex",
            flexDirection: "row",
            width: "5em",
            justifyContent: "space-around",
          }}
        >
          <Link to='/'>
            <i className='fas fa-home'></i>
          </Link>
          <Link to='/settings'>
            <i className='material-icons'>settings</i>
          </Link>
        </div>

        <Link to='/' className='brand-logo center'>
          <i className='fas fa-dragon'></i>
          DnD5
        </Link>

        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li
            className={`align-center ${
              props.location.pathname === "/create-character" ? "active" : null
            }`}
          >
            <Link to='/create-character' className='align-center'>
              <i className='material-icons'>add</i>
              Character
            </Link>
          </li>
          <li
            className={`${
              props.location.pathname === "/dungeonmaster" ? "active" : null
            }`}
          >
            <Link to='/dungeonmaster'>Dungeon Master</Link>
          </li>

          {/* <li>

        </li> */}
          <li
          //   className={`${
          //     props.location.pathname === "/logout" ? "active" : null
          //   }`}
          // >
          //   <Link to="/login">Logout</Link>
          >
            <button
              className='btn waves-effect waves-light brown'
              style={{ marginRight: "15px", marginLeft: "7px" }}
              onClick={onLogoutClick}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )

  const guestLinks = (
    <nav>
      {" "}
      <div className='nav-wrapper brown'>
        <Link to='/' className='brand-logo center'>
          <i className='fas fa-dragon'></i>
          DnD5
        </Link>
        <Link to='/' style={{ marginLeft: "15px" }}>
          <i className='fas fa-home'></i>
        </Link>
      </div>
    </nav>
  )

  return (
    <nav>
      <div className='nav-wrapper brown'>
        {/* <Link to="/" className="brand-logo center">
          <i className="fas fa-dragon"></i>
          DnD5
        </Link>
        <Link to="/" style={{ marginLeft: "15px" }}>
          <i className="fas fa-home"></i>
        </Link> */}
        {/* <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li
            className={`align-center ${
              props.location.pathname === "/create-character" ? "active" : null
            }`}
          >
            <Link to="/create-character" className="align-center">
              <i className="material-icons">add</i>
              Character
            </Link>
          </li>
          <li
            className={`${
              props.location.pathname === "/dungeonmaster" ? "active" : null
            }`}
          >
            <Link to="/dungeonmaster">Dungeon Master</Link>
          </li>
          <li>
            <button
              className="btn waves-effect waves-light brown"
              onClick={onLogoutClick}
            >
              Logout
            </button>
          </li>
        </ul> */}
        {auth.player ? authLinks : guestLinks}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
