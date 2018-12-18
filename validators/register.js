const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // check length of name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be between 2 to 30 characters";
  }

  // check if name is provided
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required!";
  }

  // check if email is valid or not
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // check if email is provided
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // check if length of password is valid
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least of 6 characters";
  }

  // check if password is provided
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  // check if confirm password matches password
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password do not match";
  }

  // check if confirm password is provided
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
