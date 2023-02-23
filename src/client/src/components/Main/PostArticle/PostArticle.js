import "./PostArticle.css";

export const PostArticle = (props) => {
  return (
    <article className="post">
      <div className="who">
        <img
          src="./images/avatar-659651__340.webp"
          alt=""
          className="user-img"
        />
        <p className="user-name">Test User</p>
      </div>
      <p className="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        vel non inventore enim sed ratione doloremque iste est neque sapiente.
      </p>
      <img src="./images/dummy-image.png" alt="" className="post-img" />
      <div className="liks-comment-count">
        <span className="like-container">
          <i className="fa-solid fa-thumbs-up" /> 200
        </span>
        <p className="comments-count">20 comments</p>
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
        <div className="comment">
          <div className="sender">
            <img
              src="./images/avatar-659651__340.webp"
              alt=""
              className="sender-img"
            />
            <p className="name">Test User</p>
          </div>
          <p className="comment-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse
            ipsum nemo. Id natus inventore error odio optio nesciunt veritatis!
          </p>
        </div>
      </div>
    </article>
  );
};
