import "./PostArticle.css";

import { addComment } from "../../../services/commentService";
import { deletePost, toggleLike } from "../../../services/postService";

import { Comment } from "../Comment/Comment";
import { EditPost } from "../../EditPost/EditPost";
import { AuthContext } from "../../../contexts/AuthContext";

import { useState, useContext } from "react";

export const PostArticle = (props) => {
  const [postId] = useState(props.id);
  const [comments, setComments] = useState(props.comments);
  const [commentDescription, setCommentDescription] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const { user } = useContext(AuthContext);

  const onDescriptionChange = (e) => {
    setCommentDescription(e.target.value);
  };

  const addNewComment = async (e) => {
    e.preventDefault();

    const data = {
      postId,
      description: commentDescription,
    };

    var result = await addComment(data, user.token);

    setComments((state) => [...state, result]);
  };

  const onDelete = async (e) => {
    e.preventDefault();

    deletePost(postId, user.token)
      .then(props.onDelete(postId))
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditPostOpen = () => {
    setEditPost((state) => !state);
  };

  const onLike = async (e) => {
    e.preventDefault();

    var result = await toggleLike(postId, user.token)

    setLikes(state => result)
  };

  return (
    <>
      {editPost ? (
        <EditPost
          onEdit={props.onEdit}
          onClose={onEditPostOpen}
          postInfo={props}
        />
      ) : null}

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
            {user.userId && user.userId == props.userId ? 
            <>
            <button onClick={onEditPostOpen} className="btn update-post">
              Edit
            </button>
            <button onClick={onDelete} className="btn delete-post">
              Delete
            </button>
            </>
            : null
          }
          </div>
        </div>
        <div className="text">{props.description}</div>
        <img src={props.imageUrl} alt="" className="post-img" />
        <div className="liks-comment-count">
          <span className="like-container">
            <i className="fa-solid fa-thumbs-up" /> {likes}
          </span>
          <p className="comments-count">{props.commentsCount} comments</p>
        </div>

        {user.email ? (
          <>
            <div className="like">
              <button onClick={onLike} className="like-icon">
                <i className="fa-regular fa-thumbs-up" /> Like this post
              </button>
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
          </>
        ) : null}
        <div className="comments">
          {comments.map((x) => (
            <Comment key={x.id} {...x} />
          ))}
        </div>
      </article>
    </>
  );
};
