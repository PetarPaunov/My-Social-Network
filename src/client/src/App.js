import {Navbar} from './components/Navbar/Navbar';
import { Main } from './components/Main/Main';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { useState } from 'react';

import {navEnum} from './components/constants/navigationConstants.js';

import './App.css';

function App() {

  const [navButton, setNavButton] = useState(false);
  const [userAction, setUserAction] = useState(null);

  const navClickHandler = (isCliced, buttonType) => {
    setNavButton(isCliced);
    setUserAction(buttonType);
  };

  const closePopupHandler = () => {
    setNavButton(false);
  };

  return (
    <div className="App">
      {navButton && userAction == navEnum.Register && <Register closePopup={closePopupHandler} />}
      {navButton && userAction == navEnum.Login && <Login closePopup={closePopupHandler} />}
      
      <Navbar clickHandler={navClickHandler}/>
      <Main />
    </div>
  );
}

export default App;
