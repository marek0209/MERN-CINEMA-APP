"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _movie = _interopRequireDefault(require("../models/movie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  findOne(req, res, next) {
    return _asyncToGenerator(function* () {
      var movie = yield _movie.default.findOne({
        slug: req.params.slug
      });
      if (!movie) return next();
      return res.status(200).send({
        data: movie
      });
    })();
  },

  findAll(req, res) {
    return _asyncToGenerator(function* () {
      var rooms = yield _movie.default.find().sort({
        title: "desc"
      });
      return res.status(200).send({
        data: rooms
      });
    })();
  },

  create(req, res) {
    return _asyncToGenerator(function* () {
      var movie = yield new _movie.default({
        title: req.body.title,
        movieDescription: req.body.movieDescription,
        movieImgUrl: req.body.movieImgUrl // title: 'Test movie',
        // movieDescription: 'Lorem ipsum',
        // movieImgUrl: "http://image-base.com/image.png"

      }).save();
      return res.status(201).send({
        data: movie,
        message: "Movie was created"
      });
    })();
  },

  update(req, res, next) {
    return _asyncToGenerator(function* () {
      var movie = yield _movie.default.find({
        slug: req.params.slug
      });
      if (!movie) return next();
      movie.title = req.body.roomName;
      movie.movieDescription = req.body.movieDescription;
      movie.movieImgUrl = req.body.movieImgUrl;
      yield movie.save();
      return res.status(200).send({
        data: movie,
        message: "Movie was updated"
      });
    })();
  },

  remove(req, res, next) {
    return _asyncToGenerator(function* () {
      var movie = yield _movie.default.findOne({
        slug: req.params.slug
      });
      if (!movie) return next();
      yield movie.remove();
      return res.status(200).send({
        message: "Movie was removed"
      });
    })();
  }

};
exports.default = _default;