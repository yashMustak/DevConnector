const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  //   data.name = !isEmpty(data.name) ? data.name : "";
  //   data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  //   if (validator.isEmpty(data.name)) {
  //     errors.name = "name field is required";
  //   }

  //   if (validator.isEmpty(data.avatar)) {
  //     errors.avatar = "avatar field is required";
  //   }

  if (validator.isEmpty(data.text)) {
    errors.text = "text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
