import "./FriendSection.css";

import { NavLink } from "react-router-dom";

export const FriendSection = ({firend}) => {
  return (
    <div className="friend-item">
      <NavLink to={`/friend/${firend.userId}`} className="firend">
        <img
          src={firend.imageUrl}
          alt=""
          className="friend-img"
        />
        <p className="firend-name">{firend.username}</p>
      </NavLink>
    </div>
  );
};
