import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { Users } from "./components/Users/Users";
import { getAllRegisterdUsers } from "./services/userService";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { navEnum } from "./components/constants/navigationConstants.js";

import "./App.css";

function App() {
  const [navButton, setNavButton] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const navClickHandler = (isCliced, buttonType) => {
    setNavButton(isCliced);
    setUserAction(buttonType);
  };

  const closePopupHandler = () => {
    setNavButton(false);
  };

  useEffect(() => {
    getAllRegisterdUsers()
      .then(result => {
        setRegisteredUsers(result);
      })
  }, []);

  return (
    <div className="App">
      {navButton && userAction == navEnum.Register && (
        <Register closePopup={closePopupHandler} />
      )}
      {navButton && userAction == navEnum.Login && (
        <Login closePopup={closePopupHandler} />
      )}

      <Navbar clickHandler={navClickHandler} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route
            path="/users"
            element={
              <div className="requests">
                {registeredUsers.map(x => <Users key={x.userId} users={x}/>)}
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
