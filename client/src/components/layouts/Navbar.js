import React from "react";
import { Link, withRouter } from "react-router-dom";
// Todo: Active/Current page

const Navbar = props => {
  // console.log(props.location.pathname);

  return (
    <nav>
      <div className='nav-wrapper brown'>
        <Link to='/' className='brand-logo center'>
          <i className='fas fa-dragon'></i>
          DnD5
        </Link>
        <Link to='/' style={{ marginLeft: "15px" }}>
          <i className='fas fa-home'></i>
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
          <li>
            <Link to='collapsible.html'>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
