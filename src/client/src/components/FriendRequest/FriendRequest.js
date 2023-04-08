import "./FriendRequest.css";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import {
  getAllFriendRequests,
  acceptRequest,
  declineRequest,
} from "../../services/friendService";

export const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    try {
      getAllFriendRequests(user.token).then((result) => {
        setRequests(result);
      });
    } catch (error) {
      navigate("/404");
    }
  }, []);

  const onAcceptRequest = async (requestId) => {
    try {
      await acceptRequest(user.token, requestId);
      setRequests((state) => state.filter((x) => x.requestId != requestId));
    } catch (error) {
      navigate("/404");
    }
  };

  const onDeclineRequest = async (requestId) => {
    try {
      await declineRequest(user.token, requestId);
      setRequests((state) => state.filter((x) => x.requestId != requestId));
    } catch (error) {
      navigate("/404");
    }
  };

  return (
    <>
      {requests.length > 0 ? (
        requests.map((x) => (
          <section key={x.userId} className="requester">
            <div className="left">
              <img className="img" src={x.imageUrl} alt="" />
              <p className="user-name">{x.username}</p>
            </div>
            <div className="right">
              <button
                className="btn accept"
                onClick={() => onAcceptRequest(x.requestId)}
              >
                Accept
              </button>
              <button
                className="btn decline"
                onClick={() => onDeclineRequest(x.requestId)}
              >
                Decline
              </button>
            </div>
          </section>
        ))
      ) : (
        <p className="no-requests">Don't have any friend requests yet!</p>
      )}
    </>
  );
};
