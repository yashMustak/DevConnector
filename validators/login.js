const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // check if email is valid or not
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // check if email is provided
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // check if password is provided
  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
