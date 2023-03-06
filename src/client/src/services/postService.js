import axios from "axios";

const baseUrl = 'http://localhost:5236/api/Post/';
const getAllUrl = baseUrl + 'all';
const addPostUrl = baseUrl + 'add-post';

export const getAllPosts = async () => {

    const response = await fetch(getAllUrl);
    const result = await response.json();

    return result;
};

export const addNewPost = async (data) => {

    const response = await axios
      .post(addPostUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiJjMDA5N2I0NS1jZjNjLTRhOGYtYjRmZi03MGJiYjcxZDEyMzMiLCJuYmYiOjE2NzgxMDQ0NzUsImV4cCI6MTY3ODE5MDg3NCwiaWF0IjoxNjc4MTA0NDc1fQ.aRz8OKkcb9eQMXnkJF-KfnNska1PTr9TMlzLaUdyMao",
        },
      });

      return response.data;
};