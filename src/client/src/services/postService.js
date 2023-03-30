const baseUrl = "http://localhost:5236/api/Post/";
const getAllUrl = baseUrl + "all";
const addPostUrl = baseUrl + "add-post";
const userPostsUrl = baseUrl + "get-user-posts";
const deletePostUrl = baseUrl + "delete?postId=";
const updatePost = baseUrl + "update";
const toggleLikeUrl = baseUrl + "toggle-like?postId=";
const getFriendPosts = baseUrl + "get-friend-posts?userId=";

export const getAllPosts = async () => {
  try {
    const response = await fetch(getAllUrl);
    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const addNewPost = async (data, token) => {
  try {
    const response = await fetch(addPostUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const editPost = async (data, token) => {
  try {
    const response = await fetch(updatePost, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (token) => {
  try {
    const response = await fetch(userPostsUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFreindPosts = async (userId, token) => {
  try {
    const response = await fetch(getFriendPosts + userId.userId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (postId, token) => {
  try {
    const response = await fetch(deletePostUrl + postId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const toggleLike = async (postId, token) => {
  try {
    const response = await fetch(toggleLikeUrl + postId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const result = await response.json();

    return result.likes;
  } catch (error) {
    throw new Error(error);
  }
};
