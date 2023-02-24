import './Register.css';

export const Register = ({
    closePopup,
}) => {
  return (
    <div className="container-register" >
      <form action="" className="register">
        <div className="head">
          <h2 className="title">Sing Up</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input-double input">
          <input type="text" name="" id="" placeholder="First name" />
          <input type="text" name="" id="" placeholder="Last name" />
        </div>
        <div className="input">
          <input type="text" name="" id="" placeholder="Username" />
        </div>
        <div className="input">
          <input type="email" name="" id="" placeholder="Email" />
        </div>
        <div className="input-double input">
          <input type="password" name="" id="" placeholder="Password" />
          <input type="password" name="" id="" placeholder="Confirm password" />
        </div>
        <button type="submit" className="reg">
          Sing up
        </button>
      </form>
    </div>
  );
};
