import "./Post.css";

export const Post = ({ closePopup }) => {
  return (
    <div className="container-post">
      <form action="" className="post">
        <div className="head">
          <h2 className="title">Add Post</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input">
          <input type="text" name="" id="" placeholder="Title" />
        </div>
        <div className="input">
          <textarea
            placeholder="Description"
            name=""
            id=""
            cols={30}
            rows={5}
            className="description-area"
            defaultValue={""}
          />
        </div>
        <div className="input">
          <label for="images" class="drop-container">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" id="images" accept="image/*" required />
          </label>
        </div>
        <button type="submit" className="pos">
          Post
        </button>
      </form>
    </div>
  );
};
