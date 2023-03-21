import "./FriendRequest.css";

import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { getAllFriendRequests, acceptRequest, declineRequest } from "../../services/friendService";

export const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllFriendRequests(user.token).then((result) => {
      setRequests(result);
    });

  }, []);

  const onAcceptRequest = async (requestId) => {
    await acceptRequest(user.token, requestId)
    setRequests(state => state.filter(x => x.requestId != requestId));
  }

  const onDeclineRequest = async (requestId) => {
    await declineRequest(user.token, requestId);
    setRequests(state => state.filter(x => x.requestId != requestId));
  }

  return (
    <>
      {requests.map((x) => (
        <section key={x.userId} className="requester">
          <div className="left">
            <img className="img" src={x.imageUrl} alt="" />
            <p className="user-name">{x.username}</p>
          </div>
          <div className="right">
            <button className="btn accept" onClick={() => onAcceptRequest(x.requestId)}>Accept</button>
            <button className="btn decline" onClick={() => onDeclineRequest(x.requestId)}>Decline</button>
          </div>
        </section>
      ))}
    </>
  );
};
