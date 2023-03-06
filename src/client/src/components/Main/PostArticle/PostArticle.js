import { useState } from "react";

import { Comment } from "../Comment/Comment";

import "./PostArticle.css";

export const PostArticle = (props) => {
  const [postId] = useState(props.id);
  const [commentDescription, setCommentDescription] = useState("");

  const onDescriptionChange = (e) => {
    setCommentDescription(e.target.value);
  };

  const addNewComment = (e) => {
    e.preventDefault();

    const data = {
      postId,
      description: commentDescription,
    };

    fetch("http://localhost:5236/api/Comment/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiJjMDA5N2I0NS1jZjNjLTRhOGYtYjRmZi03MGJiYjcxZDEyMzMiLCJuYmYiOjE2NzgxMDQ0NzUsImV4cCI6MTY3ODE5MDg3NCwiaWF0IjoxNjc4MTA0NDc1fQ.aRz8OKkcb9eQMXnkJF-KfnNska1PTr9TMlzLaUdyMao",
      },
      body: JSON.stringify(data),
    });

    props.onPostChange(true);
  };

  return (
    <article className="post">
      <div className="who">
        <div className="combine-container">
          <img src={props.userImage} alt="" className="user-img" />
          <div className="combine">
            <p className="user-name">Test User</p>
            <p className="post-title">{props.title}</p>
          </div>
        </div>

        <div className="opitons">
          <button className="btn update-post">Edit</button>
          <button className="btn delete-post">Delete</button>
        </div>
      </div>
      <div className="text">{props.description}</div>
      <img src={props.imageUrl} alt="" className="post-img" />
      <div className="liks-comment-count">
        <span className="like-container">
          <i className="fa-solid fa-thumbs-up" /> {props.likes}
        </span>
        <p className="comments-count">{props.commentsCount} comments</p>
      </div>
      <div className="like">
        <a href="" className="like-icon">
          <i className="fa-regular fa-thumbs-up" /> Like this post
        </a>
      </div>
      <form action="" className="comment-form" onSubmit={addNewComment}>
        <textarea
          placeholder="Type your comment here"
          name=""
          id=""
          cols={30}
          rows={5}
          className="comment-area"
          value={commentDescription}
          onChange={onDescriptionChange}
        />
        <button type="submit" className="comment-button">
          Comment
        </button>
      </form>
      <div className="comments">
        {props.comments.map((x) => (
          <Comment key={x.id} {...x} />
        ))}
      </div>
    </article>
  );
};
