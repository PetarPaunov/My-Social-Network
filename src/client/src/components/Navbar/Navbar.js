import "./Navbar.css";

export const Navbar = () => {
  return (
    <header className="header">
  <a href="" className="logo">
    MB
  </a>
  <nav className="nav">
    <ul className="nav-list">
      <li className="list-item">
        <a href="" className="link">
          Register
        </a>
      </li>
      <li className="list-item">
        <a href="" className="link">
          Login
        </a>
      </li>
      <li className="list-item">
        <a href="" className="link">
          Logout
        </a>
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
