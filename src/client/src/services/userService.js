import axios from "axios";

const baseUrl = 'http://localhost:5236/api/UserProfile/';
const getUserInfoUrl = baseUrl + 'user-profile';
const updateUserInfoUrl = baseUrl + 'update';
const getAllFriendsUrl = baseUrl + 'friends';
const getAllRegisterdUsersUrl = baseUrl + 'all-users';
const getFriendUserInfoUrl = baseUrl + 'friend-info?userId=';

export const getUserInfo = async (token) => {

    const response = await fetch(getUserInfoUrl, {
        headers: {
            Authorization:
              "Bearer " + token
          },
    });

    const result = await response.json();

    return result;
};

export const getFriendUserInfo = async (userId, token) => {

  console.log(userId);
  const response = await fetch(getFriendUserInfoUrl + userId.userId, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + token
    },
  });

  return response;
}

export const changeUserInfo = async (data, token) => {
    const response = await axios.put(updateUserInfoUrl, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer " + token
      },
    });
  
    return response.data;
  };

  export const getAllFriends = async (token) => {
    const response = await fetch(getAllFriendsUrl, {
      headers: {
        Authorization:
          "Bearer " + token
      },
    })

    return response.json();
  };

  export const getAllRegisterdUsers = async (token, serachParam) => {

    serachParam = serachParam != '' ? JSON.stringify(serachParam) : JSON.stringify('');
    
    const response = await fetch(getAllRegisterdUsersUrl,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + token
      },
      body: serachParam,
    });

    return response.json();
  }