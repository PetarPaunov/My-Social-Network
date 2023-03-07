const baseUrl = 'http://localhost:5236/api/UserProfile/';
const getUserInfoUrl = baseUrl + 'user-profile';

export const getUserInfo = async () => {

    const response = await fetch(getUserInfoUrl, {
        headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsIm5hbWVpZCI6IjlhNzk5OGIxLTFmYmYtNGI3My04NDExLWJlMzE5Y2UxN2VlMyIsInN1YiI6IlRlc3RAVGVzdC5jb20iLCJlbWFpbCI6IlRlc3RAVGVzdC5jb20iLCJqdGkiOiI2OGI0ZGRlNi05NjEyLTQ5YjYtOGMyZi01YzY5ODc2YWJhMTYiLCJuYmYiOjE2NzgyMDY2NjcsImV4cCI6MTY3ODI5MzA2NiwiaWF0IjoxNjc4MjA2NjY3fQ.54PoHaV4T2dsXFz1meWtSlq97258Spy9OBlk1dck_pE",
          },
    });

    const result = await response.json();

    return result;
};