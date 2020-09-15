"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _movie = _interopRequireDefault(require("../models/movie"));

var _seanse = _interopRequireDefault(require("../models/seanse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  findOne: function findOne(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var movie, seances;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _movie["default"].findOne({
                _id: req.params.id
              });

            case 2:
              movie = _context.sent;
              _context.next = 5;
              return _seanse["default"].find({
                movie: req.params.id
              });

            case 5:
              seances = _context.sent;

              if (movie) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", next());

            case 8:
              return _context.abrupt("return", res.status(200).send({
                movie: movie,
                seances: seances
              }));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  findAll: function findAll(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var movies;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _movie["default"].find().sort({
                title: "desc"
              }).populate("seanses");

            case 2:
              movies = _context2.sent;
              return _context2.abrupt("return", res.status(200).send({
                data: movies
              }));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  create: function create(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var movie;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return new _movie["default"]({
                title: req.body.title,
                movieDescription: req.body.movieDescription,
                movieImgUrl: req.body.movieImgUrl // title: 'Test movie',
                // movieDescription: 'Lorem ipsum',
                // movieImgUrl: "http://image-base.com/image.png"

              }).save();

            case 2:
              movie = _context3.sent;
              return _context3.abrupt("return", res.status(201).send({
                data: movie,
                message: "Movie was created"
              }));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  update: function update(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var movie;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _movie["default"].find({
                _id: req.params.id
              });

            case 2:
              movie = _context4.sent;

              if (movie) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", next());

            case 5:
              movie.title = req.body.movieName;
              movie.movieDescription = req.body.movieDescription;
              movie.movieImgUrl = req.body.movieImgUrl;
              _context4.next = 10;
              return movie.save();

            case 10:
              return _context4.abrupt("return", res.status(200).send({
                data: movie,
                message: "Movie was updated"
              }));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  remove: function remove(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var movie;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _movie["default"].findOne({
                _id: req.params.id
              });

            case 2:
              movie = _context5.sent;

              if (movie) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", next());

            case 5:
              _context5.next = 7;
              return movie.remove();

            case 7:
              return _context5.abrupt("return", res.status(200).send({
                message: "Movie was removed"
              }));

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
exports["default"] = _default;