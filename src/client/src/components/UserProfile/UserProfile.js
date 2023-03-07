import { PostArticle } from "../Main/PostArticle/PostArticle";

import { useEffect, useState } from "react";
import { getUserPosts } from "../../services/postService";
import { getUserInfo } from "../../services/userService";

import "./UserProfile.css";

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserInfo()
      .then(setUserInfo)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUserPosts()
      .then(setUserPosts)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeletedPost = (postId) => {
    setUserPosts(state => state.filter(post =>  post.id != postId))
  };

  return (
    <div className="bottom-part">
      <section className="user-profile">
        <img src={userInfo.imageUrl} alt="" className="user-profile-img" />

        <div className="user-info">
          <p className="user-info-field">
            <span>Username: </span>
            {userInfo.userName}
          </p>
          <p className="user-info-field">
            <span>First Name: </span>
            {userInfo.firstName}
          </p>
          <p className="user-info-field">
            <span>Last Name: </span>
            {userInfo.lastName}
          </p>
          <p className="user-info-field">
            <span>Address: </span>
            {userInfo.address}
          </p>
        </div>

        <button className="user-profile-btn">Change Information</button>
      </section>

      <section className="left-part">
        {userPosts.map((x) => (
          <PostArticle key={x.id} {...x} onDelete={onDeletedPost} />
        ))}
      </section>
    </div>
  );
};