import "./App.css";

import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { Users } from "./components/Users/Users";
import { FriendPorfile } from "./components/FriendProfile/FriendProfile";
import { FriendRequest } from "./components/FriendRequest/FriendRequest";
import { Error404 } from "./components/Error404/Error404";
import { AuthContext } from "./contexts/AuthContext";
import { RauteGuard } from "./components/common/RouteGuard";

import { useLockalStorage } from "./hooks/useLockalStorage";

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { navEnum } from "./components/constants/navigationConstants.js";

function App() {
  const [navButton, setNavButton] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [auth, setAuth] = useLockalStorage("auth", {});

  const navigate = useNavigate();

  const navClickHandler = (isCliced, buttonType) => {
    setNavButton(isCliced);
    setUserAction(buttonType);
  };

  const closePopupHandler = () => {
    setNavButton(false);
  };

  const onSigning = (authData) => {
    setAuth(authData);
  };

  const onUserInfoChange = (newUserImage) => {
    auth.imageUrl = newUserImage;
    setAuth(auth);
  };

  const onLogout = () => {
    setAuth({});
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user: auth, onSigning, onLogout, onUserInfoChange }}
    >
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
            <Route element={<RauteGuard />}>
              <Route path="/user-profile" element={<UserProfile />} />
              <Route
                path="/users"
                element={
                  <div className="users">
                    <Users />
                  </div>
                }
              />
              <Route
                path="friend-requests"
                element={
                  <div className="users">
                    <FriendRequest />
                  </div>
                }
              />
              <Route path="/friend/:userId" element={<FriendPorfile />}></Route>
            </Route>
            <Route path="/404" element={<Error404 />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
