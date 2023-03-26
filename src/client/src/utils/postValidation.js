export const errorHandler = (name, value) => {
  if (name == "title") {
    return value.length < 5 || value.length > 100
      ? "Title must be between 5 and 100 letters."
      : null;
  } else if (name == "description") {
    return value.length < 20 || value.length > 5000
      ? "Last Name must be between 20 and 5000 letters."
      : null;
  }
};

export const serverValidation = (errors) => {
  return {
    title: errors.Title ? errors.Title[0] : "",
    description: errors.Description ? errors.Description[0] : "",
    image: null,
  };
};