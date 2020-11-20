"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _room = _interopRequireDefault(require("../models/room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  findOne: function findOne(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var room;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _room["default"].findOne({
                slug: req.params.slug
              });

            case 2:
              room = _context.sent;

              if (room) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", next());

            case 5:
              return _context.abrupt("return", res.status(200).send({
                data: room
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  findAll: function findAll(req, res) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var rooms;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _room["default"].find().sort({
                createdAt: "desc"
              });

            case 2:
              rooms = _context2.sent;
              return _context2.abrupt("return", res.status(200).send({
                data: rooms
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
      var room;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return new _room["default"]({
                roomName: req.body.roomName,
                roomDescription: req.body.roomDescription,
                roomSeatsPlan: req.body.roomSeatsPlan // roomName: 'Test room',
                // roomDescription: 'Lorem ipsum',
                // roomSeatsPlan: [[true,false]]

              }).save();

            case 2:
              room = _context3.sent;
              return _context3.abrupt("return", res.status(201).send({
                data: room,
                message: "Room was created"
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
      var room;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _room["default"].find({
                slug: req.params.slug
              });

            case 2:
              room = _context4.sent;

              if (room) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", next());

            case 5:
              room.roomName = req.body.roomName;
              room.roomDescription = req.body.roomDescription;
              room.roomSeatsPlan = req.body.roomSeatsPlan;
              _context4.next = 10;
              return room.save();

            case 10:
              return _context4.abrupt("return", res.status(200).send({
                data: room,
                message: "Room was updated"
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
      var room;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _room["default"].findOne({
                slug: req.params.slug
              });

            case 2:
              room = _context5.sent;

              if (room) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", next());

            case 5:
              _context5.next = 7;
              return room.remove();

            case 7:
              return _context5.abrupt("return", res.status(200).send({
                message: "Room was removed"
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