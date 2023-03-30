const baseUrl = "http://localhost:5236/api/Account/";
const loginUrl = baseUrl + "Login";
const registerUrl = baseUrl + "register";

export const login = async (credentials) => {
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.status == 200) {
    return response.json();
  }
  else if (response.status == 400) {
    return false;
  }else{
    throw new Error('404');
  }
};

export const register = async (credentials) => {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
