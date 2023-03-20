import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext.js";
import { navEnum } from "../constants/navigationConstants.js";

import "./Navbar.css";

export const Navbar = ({ clickHandler }) => {
  const { user, onLogout } = useContext(AuthContext);

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        MB
      </NavLink>
      <nav className="nav">
        <ul className="nav-list">
          <li className="list-item">
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>

          {user.email ? (
            <>
              <li className="list-item">
                <NavLink to="/users" className="link">
                  Users
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink to="/friend-requests" className="link">
                  Requests
                </NavLink>
              </li>
              <li className="list-item">
                <NavLink to="/user-profile" className="prifile-link">
                  <img src={user.imageUrl ? user.imageUrl : "https://fakeimg.pl/300/"} alt="" className="profile-img" />
                </NavLink>
              </li>
              <li className="list-item">
                <button onClick={onLogout} className="link">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="list-item">
                <button
                  onClick={() => clickHandler(true, navEnum.Register)}
                  className="link"
                >
                  Register
                </button>
              </li>
              <li className="list-item">
                <button
                  onClick={() => clickHandler(true, navEnum.Login)}
                  className="link"
                >
                  Login
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
