import "./Users.css";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { getAllRegisterdUsers } from "../../services/userService";

export const Users = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllRegisterdUsers(user.token).then((result) => {
      setRegisteredUsers(result);
    });
  }, []);

  return (
    <section className="requester">
      {registeredUsers.map((x) => (
        <>
          <div key={x.id} className="left">
            <img className="img" src={x.imageUrl} alt="" />
            <p className="user-name">{x.username}</p>
          </div>
          <div className="right">
            <button className="btn accept">Send Friend Request</button>
          </div>
        </>
      ))}
    </section>
  );
};
