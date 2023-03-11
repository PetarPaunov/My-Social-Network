import "./Users.css";

export const Users = ({ users }) => {
  return (
      <section className="requester">
        <div className="left">
          <img className="img" src={users.imageUrl} alt="" />
          <p className="user-name">{users.username}</p>
        </div>
        <div className="right">
          <button className="btn accept">Send Friend Request</button>
        </div>
      </section>
  );
};
