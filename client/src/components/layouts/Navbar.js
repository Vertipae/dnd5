import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className='nav-wrapper brown'>
        <a href='#' className='brand-logo center'>
          DnD5
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li className='align-center'>
            <a href='sass.html' className='align-center'>
              <i className='material-icons'>add</i>
              Character
            </a>
          </li>
          <li>
            <a href='badges.html'>Dungeon Master</a>
          </li>
          <li>
            <a href='collapsible.html'>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
