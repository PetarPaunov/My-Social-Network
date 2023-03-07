import "./PostArticle.css";

import { addComment } from "../../../services/commentService";
import { deletePost } from "../../../services/postService";

import { Comment } from "../Comment/Comment";

import { useState } from "react";

export const PostArticle = (props) => {

  const [postId] = useState(props.id);
  const [comments, setComments] = useState(props.comments);
  const [commentDescription, setCommentDescription] = useState("");

  const onDescriptionChange = (e) => {
    setCommentDescription(e.target.value);
  };

  const addNewComment = async (e) => {
    e.preventDefault();

    const data = {
      postId,
      description: commentDescription,
    };

    var result = await addComment(data);

    setComments(state => [...state, result])
  };

  const onDelete = async (e) => {
    e.preventDefault();

    deletePost(postId)
    .then(props.onDelete(postId))
    .catch(err => {
      console.log(err);
    })
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
          <button onClick={onDelete} className="btn delete-post">Delete</button>
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
        {comments.map((x) => (
          <Comment key={x.id} {...x} />
        ))}
      </div>
    </article>
  );
};
