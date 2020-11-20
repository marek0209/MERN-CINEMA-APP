"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../middlewares/errors");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _roomsController = _interopRequireDefault(require("../controllers/roomsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var api = (0, _express.Router)(); // GET /rooms/:slug

  api.get("/:slug", (0, _errors.catchAsync)(_roomsController["default"].findOne)); // GET /rooms

  api.get("/", (0, _errors.catchAsync)(_roomsController["default"].findAll)); // POST /rooms

  api.post("/", _auth["default"], (0, _errors.catchAsync)(_roomsController["default"].create)); // PUT /rooms/:slug

  api.put("/:slug", _auth["default"], (0, _errors.catchAsync)(_roomsController["default"].update)); // DELETE /rooms/:slug

  api["delete"]("/:slug", _auth["default"], (0, _errors.catchAsync)(_roomsController["default"].remove));
  return api;
};

exports["default"] = _default;