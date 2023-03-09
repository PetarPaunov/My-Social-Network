import './Login.css';

export const Login = ({
    closePopup,
}) => {
  return (
    <div className="container-login">
      <form action="" className="login">
        <div className="head">
          <h2 className="title">Log in</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x"></i>
          </a>
        </div>
        <hr />
        <div className="input">
          <input type="email" name="" id="" placeholder="Enter your email" />
        </div>
        <div className="input">
          <input
            type="password"
            name=""
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
