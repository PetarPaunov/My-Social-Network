import { useState } from "react";
import axios from "axios";

import "./Post.css";

const initialFieldValues = {
  title: '',
  description: '',
  image: null,
};

export const Post = ({ closePopup }) => {

  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setValues(values => ({
      ...values,
      [name]: value,
    }));
  }

  const imageFileHandler = (e) => {
      if(e.target.files && e.target.files[0]){
        let imageFile = e.target.files[0];

          setValues(values => ({
            ...values,
            image: imageFile
          }));
      }
  }

  const postSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('Title', values.title);
    data.append('Description', values.description);
    data.append('Image', values.image);

    axios.post('http://localhost:5236/api/Post/add-post', data, {
      headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization' : "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6ImE2ZmNiMWM2LWU3MGYtNDMwNy1hMzg3LWM4ZjFhZWJlNjdkYSIsIm5iZiI6MTY3NzY5ODQwNywiZXhwIjoxNjc3Nzg0ODA2LCJpYXQiOjE2Nzc2OTg0MDd9.RygWp3qEhTNrswZRj7eNQrnx-O0ouxVLCRMo6Ct8lZE"
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

    closePopup();
  }

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
          <input type="text" name="title" id="" placeholder="Title" value={values.title} onChange={handleInputChange} />
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
            <input type="file" id="images" accept="image/*" onChange={imageFileHandler}/>
          </label>
        </div>
        <button type="submit" className="pos">
          Post
        </button>
      </form>
    </div>
  );
};
