import "./Login.css";

import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../services/authService";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({ closePopup }) => {
  const { onSigning } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = Object.fromEntries(new FormData(e.target));

      const result = await login({ email, password });

      if (!result) {
        setErrors({
          login: "Something went wrong!",
        });
      } else {
        onSigning(result);
        closePopup();
      }
    } catch (error) {
      navigate('/404');
    }
  };

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
        {errors.login ? <span className="error">{errors.login}</span> : null}
        <div className="input">
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter your email"
          />
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
