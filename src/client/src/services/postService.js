const baseUrl = 'http://localhost:5236/api/Post/';
const getAllUrl = 'http://localhost:5236/api/Post/all';

export const getAllPosts = async () => {

    const response = await fetch(getAllUrl);
    const result = await response.json();

    return result;
};