import "./Main.css";

import { Post } from "../Post/Post";
import { PostArticle } from "./PostArticle/PostArticle";
import { GridLoader } from "react-spinners";

import {getAllPosts} from '../../services/postService';

import { useEffect, useState } from "react";

const spinnerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Main = () => {
  const [postButton, setPostButton] = useState(false);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    getAllPosts()
    .then(result => {
      setPosts(result);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    });

  }, []);

  const onButtonClick = (isClicked) => {
    setPostButton(isClicked);
  };

  const closePopupHandler = () => {
    setPostButton(false);
  };

  const onAddedPost = (post) => {
    setPosts(state => [post, ...state]);
  };

  return (
    <>
      {postButton ? (
        <Post onAddedPost={onAddedPost} closePopup={closePopupHandler} />
      ) : null}

      <div className="top-part">
        <button onClick={() => onButtonClick(true)} className="add-post">
          Add new post
        </button>
      </div>

      <div className="bottom-part">
        {loading ? (
          <GridLoader style={spinnerStyle} color="#1877f2" />
        ) : (
          <section className="left-part">
            {posts.map((x) => (
              <PostArticle key={x.id} {...x} onPostChange={onAddedPost} />
            ))}
          </section>
        )}
      </div>
    </>
  );
};
