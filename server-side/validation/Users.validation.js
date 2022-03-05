const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateUser(data) {
  let errors = {};
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Ictakid = !isEmpty(data.Ictakid) ? data.Ictakid : "";
  data.Fullname = !isEmpty(data.Fullname) ? data.Fullname : "";
  data.Number = !isEmpty(data.Number) ? data.Number : "";
  data.Password = !isEmpty(data.Password) ? data.Password : "";

  if (!validator.isEmail(data.Email)) {
    errors.Email = "Format Email required";
  }
  if (validator.isEmpty(data.Email)) {
    errors.Email = "Required Email";
  }
  if (validator.isEmpty(data.Ictakid)) {
    errors.Ictakid = "Required Ictakid";
  }
  if (validator.isEmpty(data.Fullname)) {
    errors.Fullname = "Required Fullname";
  }
  if (validator.isEmpty(data.Password)) {
    errors.Password = "Required Password";
  }
  if (validator.isEmpty(data.Number)) {
    errors.Number = "Required Number";
  }
  

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
