import axios from "axios";

const baseUrl = 'http://localhost:5236/api/UserProfile/';
const getUserInfoUrl = baseUrl + 'user-profile';
const updateUserInfoUrl = baseUrl + 'update';
const getAllFriendsUrl = baseUrl + 'friends';
const getAllRegisterdUsersUrl = baseUrl + 'all-users';

export const getUserInfo = async () => {

    const response = await fetch(getUserInfoUrl, {
        headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6IjA3ZWJhZDBmLTc5YjYtNGJlZi1iYzI4LTA3NGI4YmQ1YjhkZiIsIm5iZiI6MTY3ODU0Nzk1NSwiZXhwIjoxNjc4NjM0MzU0LCJpYXQiOjE2Nzg1NDc5NTV9.FVzvqkSuLhLC5LPt1ZZee2a9alFZ4giPwVB6xFM-MLs",
          },
    });

    const result = await response.json();

    return result;
};

export const changeUserInfo = async (data) => {
    const response = await axios.put(updateUserInfoUrl, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6IjA3ZWJhZDBmLTc5YjYtNGJlZi1iYzI4LTA3NGI4YmQ1YjhkZiIsIm5iZiI6MTY3ODU0Nzk1NSwiZXhwIjoxNjc4NjM0MzU0LCJpYXQiOjE2Nzg1NDc5NTV9.FVzvqkSuLhLC5LPt1ZZee2a9alFZ4giPwVB6xFM-MLs",
      },
    });
  
    return response.data;
  };

  export const getAllFriends = async () => {
    const response = await fetch(getAllFriendsUrl, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6IjA3ZWJhZDBmLTc5YjYtNGJlZi1iYzI4LTA3NGI4YmQ1YjhkZiIsIm5iZiI6MTY3ODU0Nzk1NSwiZXhwIjoxNjc4NjM0MzU0LCJpYXQiOjE2Nzg1NDc5NTV9.FVzvqkSuLhLC5LPt1ZZee2a9alFZ4giPwVB6xFM-MLs",
      },
    })

    return response.json();
  };

  export const getAllRegisterdUsers = async () => {
    const response = await fetch(getAllRegisterdUsersUrl,{
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsIm5hbWVpZCI6IjA3NDllZWQyLTAxZWUtNDQ0YS1hMjdkLThiMDA4NjJjYTkwNyIsInN1YiI6IlRlc3QyQFRlc3QuY29tIiwiZW1haWwiOiJUZXN0MkBUZXN0LmNvbSIsImp0aSI6IjA3ZWJhZDBmLTc5YjYtNGJlZi1iYzI4LTA3NGI4YmQ1YjhkZiIsIm5iZiI6MTY3ODU0Nzk1NSwiZXhwIjoxNjc4NjM0MzU0LCJpYXQiOjE2Nzg1NDc5NTV9.FVzvqkSuLhLC5LPt1ZZee2a9alFZ4giPwVB6xFM-MLs",
      },
    });

    return response.json();
  }