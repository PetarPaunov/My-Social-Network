const baseUrl = "http://localhost:5236/api/Request/";
const getAllUrl = baseUrl + 'all-requests';
const sendRequestUrl = baseUrl + 'send?userId=';

export const sendFriendRequest = async (token, userId) => {
    const response = await fetch(sendRequestUrl + userId, { 
        method: 'POST',
        headers: {
            Authorization:
              "Bearer " + token
          },
    })

    const result = await response.json();

    return result;
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

export const acceptRequest = async () => {

};

export const declineRequest = async () => {

};