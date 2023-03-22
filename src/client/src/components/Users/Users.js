import "./Users.css";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { getAllRegisterdUsers } from "../../services/userService";
import { sendFriendRequest } from "../../services/friendService";

export const Users = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [serachParam, setSerachParam] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllRegisterdUsers(user.token, serachParam).then((result) => {
      setRegisteredUsers(result);
    });
  }, [serachParam]);

  const onFriendRequest = async (userId) => {
    await sendFriendRequest(user.token, userId);
    setRegisteredUsers((state) => state.filter((x) => x.userId != userId));
  };

  const onSerachParamChange = (e) => {
    setSerachParam(e.target.value);
  };

  return (
    <>
      <div className="serach-wrapper">
        <input
          name="search"
          onChange={onSerachParamChange}
          value={serachParam}
          className="serach"
          placeholder="Search for specific user"
        ></input>
      </div>
      {registeredUsers.length > 0 ?
       registeredUsers.map((x) => (
        <section key={x.userId} className="requester">
          <div className="left">
            <img className="img" src={x.imageUrl} alt="" />
            <p className="user-name">{x.username}</p>
          </div>
          <div className="right">
            <button
              onClick={() => onFriendRequest(x.userId)}
              className="btn accept"
            >
              Send Friend Request
            </button>
          </div>
        </section>
      ))
    : <p className="no-users">There are no users who respond to these terms!</p>}
    </>
  );
};
