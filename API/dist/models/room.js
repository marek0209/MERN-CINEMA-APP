"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUrlSlugs = _interopRequireDefault(require("mongoose-url-slugs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Room = _mongoose["default"].Schema({
  roomName: {
    type: String,
    require: true
  },
  roomDescription: {
    type: String,
    require: true
  },
  roomSeatsPlan: {
    type: Array,
    require: true
  }
}, {
  timestamps: true
});

Room.plugin((0, _mongooseUrlSlugs["default"])("roomName", {
  field: "slug",
  update: true
}));

var _default = _mongoose["default"].model("Room", Room);

exports["default"] = _default;