import {navEnum} from '../constants/navigationConstants.js'
import { NavLink } from 'react-router-dom';

import "./Navbar.css";

export const Navbar = ({
  clickHandler
}) => {
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        MB
      </NavLink>
      <nav className="nav">
        <ul className="nav-list">
          <li className="list-item">
            <button onClick={() =>clickHandler(true, navEnum.Register)} className="link">
              Register
            </button>
          </li>
          <li className="list-item">
            <button onClick={() =>clickHandler(true, navEnum.Login)} className="link">
              Login
            </button>
          </li>
          <li className="list-item">
            <button className="link">
              Logout
            </button>
          </li>
          <li className="list-item">
            <NavLink to='/' className="link">
              Home
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to='/user-profile' className="prifile-link">
              <img
                src="https://fakeimg.pl/300/"
                alt=""
                className="profile-img"
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
