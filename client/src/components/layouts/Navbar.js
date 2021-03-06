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
          <Link to='/home'>
            <i className='fas fa-home' style={{ color: "#fbe2dd" }}></i>
          </Link>
          <Link to='/settings'>
            <i className='material-icons' style={{ color: "#fbe2dd" }}>
              settings
            </i>
          </Link>
        </div>

        <Link to='/home' className='brand-logo center mybrand-logo'>
          <i className='fas fa-dragon'></i>
          DnD5
        </Link>
        <a href='#' data-target='mobile-demo' className='sidenav-trigger right'>
          <i className='material-icons'>menu</i>
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li
            className={`align-center ${
              props.location.pathname === "/create-character" ? "active" : null
            }`}
          >
            <Link to='/create-character' className='align-center'>
              <i
                className='material-icons'
                style={{ color: "Mediumslateblue" }}
              >
                add
              </i>
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

          <li>
            <button
              className='btn waves-effect waves-light'
              style={{ marginRight: "15px", marginLeft: "7px" }}
              onClick={onLogoutClick}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <ul className='sidenav' id='mobile-demo'>
        <li>
          <Link to='/create-character'>Character</Link>
        </li>

        <li>
          <Link to='/dungeonmaster'>Dungeon Master</Link>
        </li>

        <li>
          <button
            className='btn waves-effect waves-light'
            style={{ marginLeft: "20px" }}
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )

  const guestLinks = (
    <nav>
      {" "}
      <div className='nav-wrapper brown'>
        <Link to='/' className='brand-logo center mybrand-logo'>
          <i className='fas fa-dragon'></i>
          DnD5
        </Link>
        {/* <Link to='/' style={{ marginLeft: "15px" }}>
          <i className='fas fa-home' style={{ color: "Mediumslateblue" }}></i>
        </Link> */}
      </div>
    </nav>
  )

  return (
    <nav>
      <div className='nav-wrapper brown'>
        {auth.player ? authLinks : guestLinks}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
