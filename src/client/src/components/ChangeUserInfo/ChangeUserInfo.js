import "./ChangeUserInfo.css";

import { useState } from "react";
import { changeUserInfo } from "../../services/userService";

export const ChangeUserInfo = ({ closePopup, userInfo, onInfoChange }) => {
  const initialFieldValues = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    userName: userInfo.userName,
    address: userInfo.address,
    image: null,
  };

  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const imageFileHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      setValues((values) => ({
        ...values,
        image: imageFile,
      }));
    }
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("FirstName", values.firstName);
    data.append("LastName", values.lastName);
    data.append("UserName", values.userName);
    data.append("Address", values.address);
    data.append("Image", values.image);

    const result = await changeUserInfo(data);
    console.log(result);
    closePopup();

    onInfoChange(result);
  };

  return (
    <div className="container-change">
      <form action="" className="change" onSubmit={postSubmitHandler}>
        <div className="head">
          <h2 className="title">Change Information</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input-double input">
          <input
            type="text"
            name="firstName"
            id=""
            placeholder="First name"
            value={values.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            id=""
            placeholder="Last name"
            value={values.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="userName"
            id=""
            placeholder="Username"
            value={values.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="address"
            id=""
            placeholder="Address"
            value={values.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={imageFileHandler}
            />
          </label>
        </div>
        <button type="submit" className="reg">
          submit
        </button>
      </form>
    </div>
  );
};
