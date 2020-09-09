"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUrlSlugs = _interopRequireDefault(require("mongoose-url-slugs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Movie = _mongoose.default.Schema({
  title: {
    type: String,
    require: true
  },
  movieDescription: {
    type: String,
    require: true
  },
  movieImgUrl: {
    type: String,
    require: true
  }
});

Movie.plugin((0, _mongooseUrlSlugs.default)("title", {
  field: "slug",
  update: true
}));

var _default = _mongoose.default.model("Movie", Movie);

exports.default = _default;