import './Main.css';

import { Post } from "../Post/Post";
import { MainBottomLeft } from "./MainBottomLeft/MainBottomLeft";

import { useState } from "react";

export const Main = () => {
  const [postButton, setPostButton] = useState(false);

  const onButtonClick = (isClicked) => {
    setPostButton(isClicked);
  };

  const closePopupHandler = () => {
    setPostButton(false);
  };

  return (
    <main className="main">
      {postButton ? <Post closePopup={closePopupHandler} /> : null}

      <div className="top-part">
        <button onClick={() => onButtonClick(true)} className="add-post">
          Add new post
        </button>
      </div>

      <div className="bottom-part">
        <MainBottomLeft />
      </div>
    </main>
  );
};
