import "./FriendProfile.css";

import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { getFriendUserInfo } from "../../services/userService";
import { getFreindPosts } from "../../services/postService";
import { PostArticle } from "../Main/PostArticle/PostArticle";

export const FriendPorfile = () => {

  const { user } = useContext(AuthContext);

  const userId = useParams();

  const [firendInfo, setFriendInfo] = useState({});
  const [friendPosts, setFriendPosts] = useState({});


  useEffect(() => {
    getFriendUserInfo(userId, user.token)
        .then(res => res.json())
        .then(setFriendInfo)
  }, []);  

  useEffect(() => {
    getFreindPosts(userId, user.token)
        .then(res => res.json())
        .then(setFriendPosts);
  });

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
        {friendPosts.length > 0 ? (
          friendPosts.map((x) => (
            <PostArticle
              key={x.id}
              {...x}
            />
          ))
        ) : (
          <h2>No posts added</h2>
        )}
      </section>
    </div>
  );
};