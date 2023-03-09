import { PostArticle } from "../Main/PostArticle/PostArticle";

import { useEffect, useState } from "react";
import { getUserPosts } from "../../services/postService";
import { getUserInfo } from "../../services/userService";

import "./UserProfile.css";
import { ChangeUserInfo } from "../ChangeUserInfo/ChangeUserInfo";

export const UserProfile = () => {

  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [changeInfo, setChangeInfo] = useState(false);

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

  const onChangeInfoClick = () => {
    setChangeInfo(state => !state);
  }

  const closePopupHandler = () => {
    setChangeInfo(state => !state);
  };

  const onUserInfoChange = (newUserInfo) => {
    setUserInfo(state => newUserInfo);
  }

  return (
    <div className="bottom-part">
      {changeInfo ? <ChangeUserInfo onInfoChange={onUserInfoChange} userInfo={userInfo} closePopup={closePopupHandler} /> : null}
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

        <button onClick={onChangeInfoClick} className="user-profile-btn">Change Information</button>
      </section>

      <section className="left-part">
        {userPosts.map((x) => (
          <PostArticle key={x.id} {...x} onDelete={onDeletedPost} />
        ))}
      </section>
    </div>
  );
};