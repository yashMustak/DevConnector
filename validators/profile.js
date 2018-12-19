const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // check length of handle
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be within 2 to 40 characters";
  }

  // check if handle is provided
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required!";
  }

  // check if status is provided
  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required!";
  }

  // check if handle is provided
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills is required!";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Website URL is incorrect";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
