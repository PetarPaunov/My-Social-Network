import "./Post.css";

import { useState } from "react";

import {addNewPost} from '../../services/postService';

import axios from "axios";


const initialFieldValues = {
  title: "",
  description: "",
  image: null,
};

export const Post = ({ closePopup, onAddedPost }) => {

  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const imageFileHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      setValues((values) => ({
        ...values,
        image: imageFile,
      }));
    }
  };

  const postSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Title", values.title);
    data.append("Description", values.description);
    data.append("Image", values.image);

    const result = await addNewPost(data);

    closePopup();
    onAddedPost(result);
  };

  return (
    <div className="container-post">
      <form action="" className="post" onSubmit={postSubmitHandler}>
        <div className="head">
          <h2 className="title">Add Post</h2>
          <a href="#">
            <i onClick={closePopup} className="fa-solid fa-x" />
          </a>
        </div>
        <hr />
        <div className="input">
          <input
            type="text"
            name="title"
            id=""
            placeholder="Title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <textarea
            placeholder="Description"
            name="description"
            id=""
            cols={30}
            rows={5}
            className="description-area"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={imageFileHandler}
            />
          </label>
        </div>
        <button type="submit" className="pos">
          Post
        </button>
      </form>
    </div>
  );
};
