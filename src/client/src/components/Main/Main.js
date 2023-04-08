import "./Main.css";

import { Post } from "../Post/Post";
import { PostArticle } from "./PostArticle/PostArticle";
import { FriendSection } from "../FriendSection/FriendSection";
import { AuthContext } from "../../contexts/AuthContext";

import { getAllPosts } from "../../services/postService";
import { getAllFriends } from "../../services/userService";
import { spinnerStyle } from "../constants/spinnerConstants";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";

export const Main = () => {
  const [postButton, setPostButton] = useState(false);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading((state) => !state);

    getAllPosts()
      .then((result) => {
        setPosts(result);
        setLoading((state) => !state);
      })
      .catch((err) => {
        navigate("/404");
      });
  }, []);

  useEffect(() => {
    if (user.email) {
      getAllFriends(user.token)
        .then((result) => {
          setFriends(result);
        })
        .catch((err) => {
          navigate("/404");
        });
    }
  }, [user]);

  const onButtonClick = (isClicked) => {
    setPostButton(isClicked);
  };

  const closePopupHandler = () => {
    setPostButton(false);
  };

  const onAddedPost = (post) => {
    setPosts((state) => [post, ...state]);
  };

  const onEditedPost = (post) => {
    setPosts((state) =>
      state.map((x) => {
        if (x.id == post.id) {
          x = post;
        }

        return x;
      })
    );
  };

  const onDeletedPost = (postId) => {
    setPosts((state) => state.filter((post) => post.id != postId));
  };

  return (
    <>
      {postButton ? (
        <Post onAddedPost={onAddedPost} closePopup={closePopupHandler} />
      ) : null}

      {user.email ? (
        <div className="top-part">
          <button onClick={() => onButtonClick(true)} className="add-post">
            Add new post
          </button>
        </div>
      ) : null}

      <div className="bottom-part">
        {loading ? 
          <GridLoader style={spinnerStyle} color="#1877f2" /> 
          : 
          ( posts.length <= 0 ) 
          ? 
          (
            <p className="no-posts">Be the first to add post article!</p>
          )
         : (
          <section className="left-part">
            {posts.map((x) => (
              <PostArticle
                onEdit={onEditedPost}
                key={x.id}
                {...x}
                onDelete={onDeletedPost}
                onPostChange={onAddedPost}
              />
            ))}
          </section>
        )}

        {user.email && friends.length > 0 ? (
          <section className="right-part">
            <div className="friends">
              <p className="title">Friends</p>
              {friends.map((x) => (
                <FriendSection key={x.userId} firend={x} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
};
