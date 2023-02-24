import {navEnum} from '../constants/navigationConstants.js'

import "./Navbar.css";

export const Navbar = ({
  clickHandler
}) => {
  return (
    <header className="header">
      <a href="" className="logo">
        MB
      </a>
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
            <a href="" className="prifile-link">
              <img
                src="./images/avatar-659651__340.webp"
                alt=""
                className="profile-img"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
