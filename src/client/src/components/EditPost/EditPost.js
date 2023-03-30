import "./EditPost.css";

import { useState, useContext } from "react";
import { editPost } from "../../services/postService";

import { AuthContext } from "../../contexts/AuthContext";

import { errorHandler, serverValidation } from "../../utils/postValidation";
import { redirect } from "react-router-dom";

const initialErrorValues = {
  title: "",
  description: "",
  image: null,
};

export const EditPost = ({ onClose, onEdit, postInfo }) => {
  const initialFieldValues = {
    id: postInfo.id,
    title: postInfo.title,
    description: postInfo.description,
    image: null,
  };

  const { user } = useContext(AuthContext);

  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(initialErrorValues);

  const validationCheck = (e) => {
    const { name, value } = e.target;

    setErrors((errors) => ({
      ...errors,
      [name]: errorHandler(name, value),
    }));
  };

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

  const postEditHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Id", values.id);
      data.append("Title", values.title);
      data.append("Description", values.description);
      data.append("Image", values.image);

      const result = await editPost(data, user.token);

      if (result.status == 400) {
        setErrors((state) => serverValidation(result.errors));
      } else {
        onClose();
        onEdit(result);
      }
    } catch (error) {
      redirect("/404");
    }
  };

  return (
    <div className="container-post">
      <form action="" className="post" onSubmit={postEditHandler}>
        <div className="head">
          <h2 className="title">Edit Post</h2>
          <span>
            <i onClick={onClose} className="fa-solid fa-x" />
          </span>
        </div>
        <hr />
        <div className="input">
          {errors.title ? (
            <span className="error-post first">{errors.title}</span>
          ) : null}
          <input
            type="text"
            name="title"
            id=""
            placeholder="Title"
            value={values.title}
            onChange={handleInputChange}
            onBlur={validationCheck}
          />
        </div>
        <div className="input">
          {errors.description ? (
            <span className="error-post second">{errors.description}</span>
          ) : null}
          <textarea
            placeholder="Description"
            name="description"
            id=""
            cols={30}
            rows={5}
            className="description-area"
            value={values.description}
            onChange={handleInputChange}
            onBlur={validationCheck}
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
          Edit
        </button>
      </form>
    </div>
  );
};
