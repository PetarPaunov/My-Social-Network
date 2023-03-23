import "./FriendProfile.css";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { getFriendUserInfo } from "../../services/userService";

export const FriendPorfile = () => {

  const { user } = useContext(AuthContext);

  const userId = useParams();
  const [firendInfo, setFriendInfo] = useState({});


  useEffect(() => {
    getFriendUserInfo(userId, user.token)
        .then(res => res.json())
        .then(setFriendInfo)
  }, []);  

  return (
    <div className="bottom-part">
      <section className="user-profile">
        <img src={firendInfo.imageUrl} alt="" className="user-profile-img" />

        <div className="user-info">
          <p className="user-info-field">
            <span>Username: </span>
            {firendInfo.username}
          </p>
          <p className="user-info-field">
            <span>First Name: </span>
            {firendInfo.firstName}
          </p>
          <p className="user-info-field">
            <span>Last Name: </span>
            {firendInfo.lastName}
          </p>
          <p className="user-info-field">
            <span>Address: </span>
            {firendInfo.address}
          </p>
        </div>
      </section>

      <section className="left-part">
        {/* {userPosts.length > 0 ? (
          userPosts.map((x) => (
            <PostArticle
              key={x.id}
              {...x}
              onDelete={onDeletedPost}
              onEdit={onEditedPost}
            />
          ))
        ) : (
          <h2>No posts added</h2>
        )} */}
      </section>
    </div>
  );
};