import './Register.css';

import { useContext } from 'react';

import { register } from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = ({
    closePopup,
}) => {

  const { onSigning } = useContext(AuthContext);

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm
    } = Object.fromEntries(new FormData(e.target));

    const result = await register({
      firstName,
      lastName,
      userName,
      email,
      password,
      passwordConfirm
    });

    onSigning(result);
    closePopup();
  }

  return (
    <div className="container-register" >
      <form onSubmit={onRegisterHandler} className="register">
        <div className="head">
          <h2 className="title">Sing Up</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input-double input">
          <input type="text" name="firstName" id="" placeholder="First name" />
          <input type="text" name="lastName" id="" placeholder="Last name" />
        </div>
        <div className="input">
          <input type="text" name="userName" id="" placeholder="Username" />
        </div>
        <div className="input">
          <input type="email" name="email" id="" placeholder="Email" />
        </div>
        <div className="input-double input">
          <input type="password" name="password" id="" placeholder="Password" />
          <input type="password" name="passwordConfirm" id="" placeholder="Confirm password" />
        </div>
        <button type="submit" className="reg">
          Sing up
        </button>
      </form>
    </div>
  );
};
