const baseUrl = "http://localhost:5236/api/Account/";
const loginUrl = baseUrl + "Login";
const registerUrl = baseUrl + "register";

export const login = async (credentials) => {
    const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })

    const result = response.json();

    return result;
};

export const register = async (credentials) => {
    const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    const result = response.json();

    return result;
}

