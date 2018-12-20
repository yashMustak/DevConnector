const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // check if title is provided
  if (validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  // check if location is provided
  if (validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }

  // check if from is provided
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

  // if not current then to
  if (data.current === "false") {
    data.to = !isEmpty(data.to) ? data.to : "";
    if (validator.isEmpty(data.to)) {
      errors.to = "to field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
