import "./UserProfile.css";

import { PostArticle } from "../Main/PostArticle/PostArticle";

import { useEffect, useState, useContext } from "react";
import { GridLoader } from "react-spinners";

import { AuthContext } from "../../contexts/AuthContext";
import { getUserPosts } from "../../services/postService";
import { getUserInfo } from "../../services/userService";
import { spinnerStylePosts } from "../constants/spinnerConstants";

import { ChangeUserInfo } from "../ChangeUserInfo/ChangeUserInfo";
import { redirect } from "react-router-dom";

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [changeInfo, setChangeInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, onUserInfoChange } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo(user.token)
      .then(setUserInfo)
      .catch((err) => {
        redirect("/404");
      });
  }, []);

  useEffect(() => {
    setLoading((state) => !state);

    getUserPosts(user.token)
      .then((res) => {
        setUserPosts(res);
        setLoading((state) => !state);
      })
      .catch((err) => {
        redirect("/404");
      });
  }, []);

  const onDeletedPost = (postId) => {
    setUserPosts((state) => state.filter((post) => post.id != postId));
  };

  const onChangeInfoClick = () => {
    setChangeInfo((state) => !state);
  };

  const closePopupHandler = () => {
    setChangeInfo((state) => !state);
  };

  const onUserInfoChangeHandler = (newUserInfo) => {
    user.imageUrl = newUserInfo.imageUrl;
    onUserInfoChange(newUserInfo.imageUrl);
    setUserInfo((state) => newUserInfo);
  };

  const onEditedPost = (post) => {
    setUserPosts((state) =>
      state.map((x) => {
        if (x.id == post.id) {
          x = post;
        }

        return x;
      })
    );
  };

  return (
    <div className="bottom-part">
      {changeInfo ? (
        <ChangeUserInfo
          onInfoChange={onUserInfoChangeHandler}
          userInfo={userInfo}
          closePopup={closePopupHandler}
        />
      ) : null}
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

        <button onClick={onChangeInfoClick} className="user-profile-btn">
          Change Information
        </button>
      </section>

      <section className="left-part">
        {loading ? (
          <GridLoader style={spinnerStylePosts} color="#1877f2" />
        ) : userPosts.length > 0 ? (
          userPosts.map((x) => (
            <PostArticle
              key={x.id}
              {...x}
              onDelete={onDeletedPost}
              onEdit={onEditedPost}
            />
          ))
        ) : (
          <h2 className="no-posts">No posts added!</h2>
        )}
      </section>
    </div>
  );
};
