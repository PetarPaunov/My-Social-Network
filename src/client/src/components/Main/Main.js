import { MainTop } from "./MainTop/MainTop";
import { MainBottom } from "./MainBottom/MainBottom";
import { useState } from "react";
import { Post } from "../Post/Post";

export const Main = () => {

    const [postButton, setPostButton] = useState(false);

    const buttonClick = (isClicked) => {
        setPostButton(isClicked);
    }

    const closePopupHandler = () => {
        setPostButton(false);
      };

    return (
        <main className="main">
            {postButton ? <Post closePopup={closePopupHandler} /> : null}
            <MainTop onButtonClick={buttonClick}/>
            <MainBottom />
        </main>
    );
}