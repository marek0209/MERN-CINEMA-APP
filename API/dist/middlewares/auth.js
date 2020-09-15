"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(req, res, next) {
  var token = req.header("Authorization"); // Check for token

  if (!token) return res.status(401).json({
    msg: "No token, authorizaton denied"
  });

  try {
    // Verify token
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // Add user from payload


    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "Token is not valid"
    });
  }
};

exports["default"] = _default;