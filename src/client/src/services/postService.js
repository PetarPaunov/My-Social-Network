import axios from "axios";

const baseUrl = "http://localhost:5236/api/Post/";
const getAllUrl = baseUrl + "all";
const addPostUrl = baseUrl + "add-post";
const userPostsUrl = baseUrl + "get-user-posts";
const deletePostUrl = baseUrl + "delete?postId=";
const updatePost = baseUrl + 'update';

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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
    },
  });

  return response.data;
};

export const editPost = async (data) => {
  const response = await axios.put(updatePost, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
    },
  });

  return response.data;
};

export const getUserPosts = async () => {
  const response = await fetch(userPostsUrl, {
    headers: {
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
    },
  });

  const result = await response.json();

  return result;
};
