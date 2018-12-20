const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // check if school is provided
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }

  // check if degree is provided
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  // check if from is provided
  if (validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

  // check if fieldofstudy is provided
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy field is required";
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
