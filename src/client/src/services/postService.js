import axios from "axios";

const baseUrl = "http://localhost:5236/api/Post/";
const getAllUrl = baseUrl + "all";
const addPostUrl = baseUrl + "add-post";
const userPostsUrl = baseUrl + "get-user-posts";
const deletePostUrl = baseUrl + "delete?postId=";

export const getAllPosts = async () => {
  const response = await fetch(getAllUrl);
  const result = await response.json();

  return result;
};

export const addNewPost = async (data) => {
  const response = await axios.post(addPostUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiJjMDA5N2I0NS1jZjNjLTRhOGYtYjRmZi03MGJiYjcxZDEyMzMiLCJuYmYiOjE2NzgxMDQ0NzUsImV4cCI6MTY3ODE5MDg3NCwiaWF0IjoxNjc4MTA0NDc1fQ.aRz8OKkcb9eQMXnkJF-KfnNska1PTr9TMlzLaUdyMao",
    },
  });

  return response.data;
};

export const getUserPosts = async () => {
  const response = await fetch(userPostsUrl, {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiI1NzRiNzIzNi1lZTBlLTQxOWUtYTNlMS1kOWI4MGNkYTA4ZjEiLCJuYmYiOjE2NzgzNzI0MjYsImV4cCI6MTY3ODQ1ODgyNSwiaWF0IjoxNjc4MzcyNDI2fQ.hGSlGo7-CuyR4RStwW47VyJCBk603rZzVGHGuHed7qY",
    },
  });

  const result = await response.json();

  console.log(result);
  return result;
};

export const deletePost = async (postId) => {
  const response = await fetch(deletePostUrl + postId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiI2OGI0ZGRlNi05NjEyLTQ5YjYtOGMyZi01YzY5ODc2YWJhMTYiLCJuYmYiOjE2NzgyMDY2NjcsImV4cCI6MTY3ODI5MzA2NiwiaWF0IjoxNjc4MjA2NjY3fQ.54PoHaV4T2dsXFz1meWtSlq97258Spy9OBlk1dck_pE",
    },
  });

  const result = await response.json();

  return result;
};
