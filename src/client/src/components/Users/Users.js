import "./Users.css";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { getAllRegisterdUsers } from "../../services/userService";
import { sendFriendRequest } from "../../services/friendService";

export const Users = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllRegisterdUsers(user.token).then((result) => {
      setRegisteredUsers(result);
    });
  }, []);

  const onFriendRequest = async (userId) => {
    await sendFriendRequest(user.token, userId);
    setRegisteredUsers(state => state.filter(x => x.userId != userId))
  }

  return (
    <>
      {registeredUsers.map((x) => (
        <section key={x.userId} className="requester">
          <div className="left">
            <img className="img" src={x.imageUrl} alt="" />
            <p className="user-name">{x.username}</p>
          </div>
          <div className="right">
            <button onClick={() => onFriendRequest(x.userId)} className="btn accept">Send Friend Request</button>
          </div>
        </section>
      ))}
    </>
  );
};
