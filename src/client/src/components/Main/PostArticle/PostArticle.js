import "./PostArticle.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { addComment } from "../../../services/commentService";
import { deletePost, toggleLike } from "../../../services/postService";

import { Comment } from "../Comment/Comment";
import { EditPost } from "../../EditPost/EditPost";
import { Modal } from "../../Modal/Modal";
import { AuthContext } from "../../../contexts/AuthContext";

import { useState, useContext } from "react";
import { redirect } from "react-router-dom";

export const PostArticle = (props) => {
  const [postId] = useState(props.id);
  const [comments, setComments] = useState(props.comments);
  const [commentDescription, setCommentDescription] = useState("");
  const [editPost, setEditPost] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const { user } = useContext(AuthContext);

  const onDescriptionChange = (e) => {
    setCommentDescription(e.target.value);
  };

  const addNewComment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        postId,
        description: commentDescription,
      };

      var result = await addComment(data, user.token);

      setComments((state) => [...state, result]);
    } catch (error) {
      redirect("/404");
    }
  };

  const openModalHandler = () => {
    setModalDelete((state) => !state);
  };

  const onDelete = async (e) => {
    e.preventDefault();

    deletePost(postId, user.token)
      .then(props.onDelete(postId))
      .catch((err) => {
        redirect("/404");
      });
  };

  const onEditPostOpen = () => {
    setEditPost((state) => !state);
  };

  const onLike = async (e) => {
    try {
      e.preventDefault();

      var result = await toggleLike(postId, user.token);

      setLikes((state) => result);
    } catch (error) {
      redirect("/404");
    }
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

      {modalDelete ? (
        <Modal onDelete={onDelete} opneModal={openModalHandler} />
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
            {user.userId && user.userId == props.userId ? (
              <>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{
                    color: "#e17f0e",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  onClick={onEditPostOpen}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{
                    color: "#941414",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    marginLeft: ".7rem",
                  }}
                  onClick={openModalHandler}
                />
              </>
            ) : null}
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
