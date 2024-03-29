export const passwordDidNotMatch = (password, confirmPassword) =>
  password == confirmPassword
    ? ""
    : "Password must be same as Confirm Password.";

export const errorHandler = (name, value) => {
  if (name == "userName") {
    return value.length < 3 || value.length > 50
      ? "Username must be a minimum length of 3 and a maximum of 50."
      : null;
  } else if (name == "firstName") {
    return value.length < 3 || value.length > 50
      ? "First Name must be between 3 and 50 letters."
      : null;
  } else if (name == "lastName") {
    return value.length < 3 || value.length > 50
      ? "Last Name must be between 3 and 50 letters."
      : null;
  } else if (name == "email") {
    const emailIsValid = emailValidation(value);

    return !emailIsValid ? "Email field is not a valid e-mail address." : null;
  }
};

export const serverValidation = (errors) => {
  return {
    firstName: errors.FirstName ? errors.FirstName[0] : "",
    lastName: errors.LastName ? errors.LastName[0] : "",
    userName: errors.UserName ? errors.UserName[0] : "",
    email: errors.Email ? errors.Email[0] : "",
    password: errors.Password ? errors.Password[0] : "",
    passwordConfirm: "",
  };
};

const emailValidation = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
