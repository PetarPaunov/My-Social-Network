import "./Main.css";

import { Post } from "../Post/Post";
import { PostArticle } from "./PostArticle/PostArticle";
import { GridLoader } from "react-spinners";

import { useEffect, useState } from "react";

const spinnerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Main = () => {
  const [postButton, setPostButton] = useState(false);
  const [addedNewArticle, setAddedNewArticle] = useState(false);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5236/api/Post/all")
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
        setLoading(false);
        setAddedNewArticle(false);
      });
  }, [addedNewArticle]);

  const onButtonClick = (isClicked) => {
    setPostButton(isClicked);
  };

  const closePopupHandler = () => {
    setPostButton(false);
  };

  const onNewArticleAdded = (isAdded) => {
    setAddedNewArticle(isAdded)
  };

  return (
    <main className="main">
      {postButton ? <Post onAddedArticle={onNewArticleAdded} closePopup={closePopupHandler} /> : null}

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
              <PostArticle key={x.id} {...x} />
            ))}
          </section>
        )}

      </div>
    </main>
  );
};
