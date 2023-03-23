import axios from "axios";

const baseUrl = "http://localhost:5236/api/Post/";
const getAllUrl = baseUrl + "all";
const addPostUrl = baseUrl + "add-post";
const userPostsUrl = baseUrl + "get-user-posts";
const deletePostUrl = baseUrl + "delete?postId=";
const updatePost = baseUrl + 'update';
const toggleLikeUrl = baseUrl + 'toggle-like?postId=';
const getFriendPosts = baseUrl + 'get-friend-posts?userId=';

export const getAllPosts = async () => {
  const response = await fetch(getAllUrl);
  const result = await response.json();

  return result;
};

export const addNewPost = async (data, token) => {
  const response = await axios.post(addPostUrl, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer " + token
    },
  });

  return response.data;
};

export const editPost = async (data, token) => {
  const response = await axios.put(updatePost, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer " + token
    },
  });

  return response.data;
};

export const getUserPosts = async (token) => {
  const response = await fetch(userPostsUrl, {
    headers: {
      Authorization:
        "Bearer " + token
    },
  });

  const result = await response.json();

  return result;
};

export const getFreindPosts = async (userId, token) => {
  const response = await fetch(getFriendPosts + userId.userId, {
    headers: {
      Authorization:
        "Bearer " + token
    },
  });

  return response;
};

export const deletePost = async (postId, token) => {
  const response = await fetch(deletePostUrl + postId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer " + token
    },
  });

  const result = await response.json();

  return result;
};

export const toggleLike = async (postId, token) => {
  const response = await fetch(toggleLikeUrl + postId, {
    method: 'POST',
    headers: {
      Authorization:
        "Bearer " + token
    }
  });

  const result = await response.json();

  return result.likes;
}
