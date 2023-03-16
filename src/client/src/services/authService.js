const baseUrl = "http://localhost:5236/api/Account/";
const loginUrl = baseUrl + "Login";

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

// export const Login = async (credentials, JWT) => {
//     const response = await fetch(loginUrl, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//              Authorization: "Bearer " + JWT
//         },
//         body: JSON.stringify(credentials)
//     })

//     const result = response.json();

//     return result;
// };