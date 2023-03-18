import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { Users } from "./components/Users/Users";
import { AuthContext } from "./contexts/AuthContext";
import { useLockalStorage } from "./hooks/useLockalStorage";

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { navEnum } from "./components/constants/navigationConstants.js";

import "./App.css";

function App() {
  const [navButton, setNavButton] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [auth, setAuth] = useLockalStorage('auth', {});

  const navigate = useNavigate();

  const navClickHandler = (isCliced, buttonType) => {
    setNavButton(isCliced);
    setUserAction(buttonType);
  };

  const closePopupHandler = () => {
    setNavButton(false);
  };

  const onSigning  = (authData) => {
    setAuth(authData);
  };

  const onUserInfoChange = (newUserImage) => {
      auth.imageUrl = newUserImage;
      setAuth(auth);
  }

  const onLogout = () => {
    setAuth({});
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user: auth, onSigning , onLogout, onUserInfoChange }}>
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
                  <Users />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
