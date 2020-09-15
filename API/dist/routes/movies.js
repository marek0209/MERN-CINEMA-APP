"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _errors = require("../middlewares/errors");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _moviesController = _interopRequireDefault(require("../controllers/moviesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var api = (0, _express.Router)(); // GET /movies/:id

  api.get("/:id", (0, _errors.catchAsync)(_moviesController["default"].findOne)); // GET /movies

  api.get("/", (0, _errors.catchAsync)(_moviesController["default"].findAll)); // POST /movies

  api.post("/", (0, _errors.catchAsync)(_moviesController["default"].create)); // PUT /movies/:id

  api.put("/:id", _auth["default"], (0, _errors.catchAsync)(_moviesController["default"].update)); // DELETE /movies/:id

  api["delete"]("/:id", _auth["default"], (0, _errors.catchAsync)(_moviesController["default"].remove));
  return api;
};

exports["default"] = _default;