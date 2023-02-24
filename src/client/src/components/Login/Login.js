import './Login.css';

export const Login = ({
    closePopup,
}) => {
  return (
    <div class="container-login">
      <form action="" class="login">
        <div class="head">
          <h2 class="title">Log in</h2>
          <a href="#">
            <i onClick={closePopup} class="fa-solid fa-x"></i>
          </a>
        </div>
        <hr />
        <div class="input">
          <input type="email" name="" id="" placeholder="Enter your email" />
        </div>
        <div class="input">
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" class="log">
          Sing up
        </button>
      </form>
    </div>
  );
};
