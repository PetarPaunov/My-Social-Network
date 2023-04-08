import "./Users.css";

import { useEffect, useState, useContext } from "react";
import { GridLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { getAllRegisterdUsers } from "../../services/userService";
import { sendFriendRequest } from "../../services/friendService";
import { spinnerStyle } from "../constants/spinnerConstants";

export const Users = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [serachParam, setSerachParam] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading((state) => !state);

    getAllRegisterdUsers(user.token, serachParam)
      .then((result) => {
        setRegisteredUsers(result);
        setLoading((state) => !state);
      })
      .catch((err) => {
        navigate("/404");
      });
  }, [serachParam]);

  const onFriendRequest = async (userId) => {
    try {
      await sendFriendRequest(user.token, userId);
      setRegisteredUsers((state) => state.filter((x) => x.userId != userId));
    } catch (error) {
      navigate("/404");
    }
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
      {loading ? (
        <GridLoader style={spinnerStyle} color="#1877f2" />
      ) : registeredUsers.length > 0 ? (
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
      ) : (
        <p className="no-users">
          There are no users who respond to these terms!
        </p>
      )}
    </>
  );
};
