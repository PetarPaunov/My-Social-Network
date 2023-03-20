import "./FriendRequest.css";

import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { getAllFriendRequests } from "../../services/friendService";

export const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllFriendRequests(user.token).then((result) => {
      setRequests(result);
    });

  }, []);

  return (
    <>
      {requests.map((x) => (
        <section key={x.id} className="requester">
          <div className="left">
            <img className="img" src={x.imageUrl} alt="" />
            <p className="user-name">{x.username}</p>
          </div>
          <div className="right">
            <button className="btn accept">Accept</button>
            <button className="btn decline">Decline</button>
          </div>
        </section>
      ))}
    </>
  );
};
