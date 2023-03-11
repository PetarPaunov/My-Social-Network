import "./Users.css";

export const Users = () => {
  return (
    <div className="requests">
      <section className="requester">
        <div className="left">
          <img className="img" src="./images/avatar-659651__340.webp" alt="" />
          <p className="user-name">Test User</p>
        </div>
        <div className="right">
          <button className="btn accept">Send Friend Request</button>
        </div>
      </section>
    </div>
  );
};
