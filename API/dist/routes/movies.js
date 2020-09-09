"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _errors = require("../middlewares/errors");

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _moviesController = _interopRequireDefault(require("../controllers/moviesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = () => {
  var api = (0, _express.Router)(); // GET /rooms/:slug

  api.get("/:slug", (0, _errors.catchAsync)(_moviesController.default.findOne)); // GET /rooms

  api.get("/", (0, _errors.catchAsync)(_moviesController.default.findAll)); // POST /rooms

  api.post("/", _auth.default, (0, _errors.catchAsync)(_moviesController.default.create)); // PUT /rooms/:slug

  api.put("/:slug", _auth.default, (0, _errors.catchAsync)(_moviesController.default.update)); // DELETE /rooms/:slug

  api.delete("/:slug", _auth.default, (0, _errors.catchAsync)(_moviesController.default.remove));
  return api;
};

exports.default = _default;