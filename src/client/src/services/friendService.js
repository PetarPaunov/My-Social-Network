const baseUrl = "http://localhost:5236/api/Request/";
const getAllUrl = baseUrl + 'all-requests';

export const sendFriendRequest = async () => {

};

export const getAllFriendRequests = async (token) => {
    const response = await fetch(getAllUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "multipart/form-data",
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