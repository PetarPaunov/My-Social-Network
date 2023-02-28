import { MainTop } from "./MainTop/MainTop";
import { Post } from "../Post/Post";
import { MainBottomLeft } from "./MainBottomLeft/MainBottomLeft";

import { useState } from "react";

export const Main = () => {
  const [postButton, setPostButton] = useState(false);

  const buttonClick = (isClicked) => {
    setPostButton(isClicked);
  };

  const closePopupHandler = () => {
    setPostButton(false);
  };

  return (
    <main className="main">
      {postButton ? <Post closePopup={closePopupHandler} /> : null}

      <MainTop onButtonClick={buttonClick} />

      <div className="bottom-part">
        <MainBottomLeft />
      </div>

    </main>
  );
};
