"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authController = _interopRequireDefault(require("../controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var api = (0, _express.Router)();
  api.post("/login", _authController["default"].login);
  api.post("/register", _authController["default"].register);
  return api;
};

exports["default"] = _default;