"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function validateLoginInput(data) {
  var errors = {}; // Convert empty fields to an empty string so we can use validator functions

  data.email = !(0, _isEmpty["default"])(data.email) ? data.email : "";
  data.password = !(0, _isEmpty["default"])(data.password) ? data.password : ""; // Email checks

  if (_validator["default"].isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!_validator["default"].isEmail(data.email)) {
    errors.email = "Email is invalid";
  } // Password checks


  if (_validator["default"].isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
}

var _default = validateLoginInput;
exports["default"] = _default;