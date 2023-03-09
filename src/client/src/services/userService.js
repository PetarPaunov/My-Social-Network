const baseUrl = 'http://localhost:5236/api/UserProfile/';
const getUserInfoUrl = baseUrl + 'user-profile';

export const getUserInfo = async () => {

    const response = await fetch(getUserInfoUrl, {
        headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiI1NzRiNzIzNi1lZTBlLTQxOWUtYTNlMS1kOWI4MGNkYTA4ZjEiLCJuYmYiOjE2NzgzNzI0MjYsImV4cCI6MTY3ODQ1ODgyNSwiaWF0IjoxNjc4MzcyNDI2fQ.hGSlGo7-CuyR4RStwW47VyJCBk603rZzVGHGuHed7qY",
          },
    });

    const result = await response.json();

    return result;
};