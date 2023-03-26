import "./Register.css";

import { useContext, useState } from "react";

import { register } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

import { errorHandler, passwordDidNotMatch } from '../../utils/registerValidation';

const initialObject = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const Register = ({ closePopup }) => {
  const { onSigning } = useContext(AuthContext);
  const [values, setValues] = useState(initialObject);
  const [errors , setErrors] = useState(initialObject);

  const validationCheck = (e) => { 
    const { name , value } = e.target;

    setErrors((errors) => ({
      ...errors,
      [name] : errorHandler(name, value)
    }));
  }

  const passwordValidation = () => {
    setErrors((errors) => ({
      ...errors,
      passwordConfirm : passwordDidNotMatch(values.password, values.passwordConfirm),
      password : passwordDidNotMatch(values.password, values.passwordConfirm),
    }));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    const result = await register(values);

    console.log(result);
    onSigning(result);
    closePopup();
  };

  return (
    <div className="container-register">
      <form onSubmit={onRegisterHandler} className="register">
        <div className="head">
          <h2 className="title">Sing Up</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input-double input">
          <div>
            {errors.firstName ? <span className="error-reg first">{errors.firstName}</span> : null}
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              value={values.firstName}
              onChange={handleInputChange}
              onBlur={validationCheck}
            />
          </div>
          <div>
            {errors.lastName ? <span className="error-reg first">{errors.lastName}</span> : null}
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              value={values.lastName}
              onChange={handleInputChange}
              onBlur={validationCheck}
            />
          </div>
        </div>
        <div className="input">
          {errors.userName ? <span className="error-reg second">{errors.userName}</span> : null}
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            value={values.userName}
            onChange={handleInputChange}
            onBlur={validationCheck}
          />
        </div>
        <div className="input">
          {errors.email ? <span className="error-reg third">{errors.email}</span> : null}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
            onBlur={validationCheck}
          />
        </div>
        <div className="input-double input">
          <div>
          {errors.password ? <span className="error-reg forth">{errors.password}</span> : null}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              onChange={handleInputChange}
              onBlur={passwordValidation}
            />
          </div>
          <div>
          {errors.passwordConfirm ? <span className="error-reg forth">{errors.passwordConfirm}</span> : null}
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm password"
              value={values.passwordConfirm}
              onChange={handleInputChange}
              onBlur={passwordValidation}
            />
          </div>
        </div>
        <button type="submit" className="reg">
          Sing up
        </button>
      </form>
    </div>
  );
};
