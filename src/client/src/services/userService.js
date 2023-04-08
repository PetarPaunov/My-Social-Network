const baseUrl = "http://localhost:5236/api/UserProfile/";
const getUserInfoUrl = baseUrl + "user-profile";
const updateUserInfoUrl = baseUrl + "update";
const getAllFriendsUrl = baseUrl + "friends";
const getAllRegisterdUsersUrl = baseUrl + "all-users";
const getFriendUserInfoUrl = baseUrl + "friend-info?userId=";

export const getUserInfo = async (token) => {
  try {
    const response = await fetch(getUserInfoUrl, {
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

export const getFriendUserInfo = async (userId, token) => {
  try {
    const response = await fetch(getFriendUserInfoUrl + userId.userId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const changeUserInfo = async (data, token) => {
  try {
    const response = await fetch(updateUserInfoUrl, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllFriends = async (token) => {
  try {
    const response = await fetch(getAllFriendsUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllRegisterdUsers = async (token, serachParam) => {
  try {
    serachParam =
      serachParam != "" ? JSON.stringify(serachParam) : JSON.stringify("");

    const response = await fetch(getAllRegisterdUsersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: serachParam,
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
