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
      description: commentDescription
    };

    fetch("http://localhost:5236/api/Comment/add", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6IjViMTA2ZTU3LTY4NDYtNDNmNS1iNzY4LTkwMDRjM2M3MDk0YyIsIm5iZiI6MTY3Nzc3MDk3NSwiZXhwIjoxNjc3ODU3MzczLCJpYXQiOjE2Nzc3NzA5NzV9.Bw1mnna9of9s3hcUQaRrkwbO-O84R7lt3XAOOKbKa_I",
      },
      body: JSON.stringify(data),
    });

    props.onPostChange(true);
  };

  return (
    <article className="post">
      <div className="who">
        <img src={props.userImage} alt="" className="user-img" />
        <div className="combine">
          <p className="user-name">Test User</p>
          <p className="post-title">{props.title}</p>
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
