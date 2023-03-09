import './ChangeUserInfo.css';

export const ChangeUserInfo = ({
    closePopup,
}) => {
    return(
        <div className="container-change" >
      <form action="" className="change">
        <div className="head">
          <h2 className="title">Change Information</h2>
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
          <input type="text" name="" id="" placeholder="Address" />
        </div>
        <div className="input">
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              id="images"
              accept="image/*"
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