const baseUrl = "http://localhost:5236/api/Request/";
const getAllUrl = baseUrl + 'all-requests';
const sendRequestUrl = baseUrl + 'send?userId=';
const acceptRequestUrl = baseUrl + 'accept?requestId=';
const declineRequestUrl = baseUrl + 'decline?requestId=';

export const sendFriendRequest = async (token, userId) => {
    const response = await fetch(sendRequestUrl + userId, { 
        method: 'POST',
        headers: {
            Authorization:
              "Bearer " + token
          },
    })
};

export const getAllFriendRequests = async (token) => {
    const response = await fetch(getAllUrl, {
        method: 'GET',
        headers: {
            Authorization:
              "Bearer " + token
          },
    })

    const result = await response.json();

    return result;
};

export const acceptRequest = async (token, requestId) => {
    const response = await fetch(acceptRequestUrl + requestId, {
        method: 'POST',
        headers: {
            Authorization:
              "Bearer " + token
          },
    });
};

export const declineRequest = async (token, requestId) => {
    const response = await fetch(declineRequestUrl + requestId, {
        method: 'POST',
        headers: {
            Authorization:
              "Bearer " + token
          },
    });
};