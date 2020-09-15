"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../middlewares/errors");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _seansesController = _interopRequireDefault(require("../controllers/seansesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var api = (0, _express.Router)(); // GET /seanses/:id

  api.get("/:id", (0, _errors.catchAsync)(_seansesController["default"].findOne)); // GET /seanses

  api.get("/", (0, _errors.catchAsync)(_seansesController["default"].findAll)); // POST /seanses

  api.post("/", (0, _errors.catchAsync)(_seansesController["default"].create)); // PUT /seanses/:id

  api.put("/:id", _auth["default"], (0, _errors.catchAsync)(_seansesController["default"].update)); // DELETE /seanses/:id

  api["delete"]("/:id", _auth["default"], (0, _errors.catchAsync)(_seansesController["default"].remove));
  return api;
};

exports["default"] = _default;