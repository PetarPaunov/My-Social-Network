import axios from "axios";

const baseUrl = 'http://localhost:5236/api/UserProfile/';
const getUserInfoUrl = baseUrl + 'user-profile';
const updateUserInfo = baseUrl + 'update';

export const getUserInfo = async () => {

    const response = await fetch(getUserInfoUrl, {
        headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
          },
    });

    const result = await response.json();

    return result;
};

export const changeUserInfo = async (data) => {
    const response = await axios.put(updateUserInfo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiIzOTAyNjQ5Zi03YjA1LTRiNTItOTljYi1kM2JlMDBiNTgxNGUiLCJuYmYiOjE2Nzg0NjQxMTgsImV4cCI6MTY3ODU1MDUxNywiaWF0IjoxNjc4NDY0MTE4fQ.Zl5R7nNP8w0GQuMQ6seIWAO-33uuDc5CneA_ruahruY",
      },
    });
  
    return response.data;
  };