import { Comment } from "../Comment/Comment";
import { useEffect, useState } from "react";

import "./PostArticle.css";

export const PostArticle = (props) => {
  return (
    <article className="post">
      <div className="who">
        <img
          src={props.userImage}
          alt=""
          className="user-img"
        />
        <div className="combine">
          <p className="user-name">Test User</p>
          <p className="post-title">{props.title}</p>
        </div>
      </div>
      <p className="text">
        {props.description}
      </p>
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
      <form action="" className="comment-form">
        <textarea
          placeholder="Type your comment here"
          name=""
          id=""
          cols={30}
          rows={5}
          className="comment-area"
          defaultValue={""}
        />
        <button type="submit" className="comment-button">
          Comment
        </button>
      </form>
      <div className="comments">
        {props.comments.map(x => <Comment key={x.description} {...x} />)}
      </div>
    </article>
  );
};
