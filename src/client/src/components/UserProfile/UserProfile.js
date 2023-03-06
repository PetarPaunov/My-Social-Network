import { PostArticle } from "../Main/PostArticle/PostArticle";

import { useEffect, useState } from "react";

import "./UserProfile.css";

export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5236/api/UserProfile/user-profile", {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiJjMDA5N2I0NS1jZjNjLTRhOGYtYjRmZi03MGJiYjcxZDEyMzMiLCJuYmYiOjE2NzgxMDQ0NzUsImV4cCI6MTY3ODE5MDg3NCwiaWF0IjoxNjc4MTA0NDc1fQ.aRz8OKkcb9eQMXnkJF-KfnNska1PTr9TMlzLaUdyMao",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5236/api/Post/get-user-posts", {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiJjMDA5N2I0NS1jZjNjLTRhOGYtYjRmZi03MGJiYjcxZDEyMzMiLCJuYmYiOjE2NzgxMDQ0NzUsImV4cCI6MTY3ODE5MDg3NCwiaWF0IjoxNjc4MTA0NDc1fQ.aRz8OKkcb9eQMXnkJF-KfnNska1PTr9TMlzLaUdyMao",
      },
    })
    .then((res) => res.json())
    .then((result) => {
        setUserPosts(result)
    });
  }, []);

  console.log(userPosts);

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
        {userPosts.map(x => (
            <PostArticle key={x.id} {...x} />
        ))}
      </section>
    </div>
  );
};
