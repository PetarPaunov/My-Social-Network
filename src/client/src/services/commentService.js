const baseUrl = "http://localhost:5236/api/Comment/";
const addCommentUrl = baseUrl + "add";

export const addComment = async (data, token) => {
  try {
    
    const response = await fetch(addCommentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result;

  } catch (error) {
    throw new Error(error);
  }
};
