export const errorHandler = (name, value) => {
  if (name == "firstName") {
    return value.length < 3 || value.length > 50
      ? "First name must be between 3 and 50 letters."
      : null;
  } else if (name == "lastName") {
    return value.length < 3 || value.length > 50
      ? "Last Name must be between 3 and 50 letters."
      : null;
  } else if (name == "userName") {
    return value.length < 3 || value.length > 50
      ? "Username must be between 3 and 50 letters."
      : null;
  }
};

export const serverValidation = (errors) => {
  return {
    firstName: errors.FirstName ? errors.FirstName[0] : "",
    lastName: errors.LastName ? errors.LastName[0] : "",
    userName: errors.UserName ? errors.UserName[0] : "",
    address: "",
    image: null,
  };
};
