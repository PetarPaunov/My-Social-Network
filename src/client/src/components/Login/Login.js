import './Login.css';

import { AuthContext } from '../../contexts/AuthContext';
import { login } from '../../services/authService';

import { useContext } from 'react';

export const Login = ({
    closePopup,
}) => {
  const { onLogin } = useContext(AuthContext);

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const {
      email,
      password,
    } = Object.fromEntries(new FormData(e.target));

    const result = await login({email, password})

    onLogin(result);
    closePopup();
  }

  return (
    <div className="container-login">
      <form onSubmit={onLoginHandler} action="" className="login">
        <div className="head">
          <h2 className="title">Log in</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x"></i>
          </a>
        </div>
        <hr />
        <div className="input">
          <input type="email" name="email" id="" placeholder="Enter your email" />
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            id=""
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="log">
          Sing up
        </button>
      </form>
    </div>
  );
};
