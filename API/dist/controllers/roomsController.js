"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _room = _interopRequireDefault(require("../models/room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  findOne(req, res, next) {
    return _asyncToGenerator(function* () {
      var room = yield _room.default.findOne({
        slug: req.params.slug
      });
      if (!room) return next();
      return res.status(200).send({
        data: room
      });
    })();
  },

  findAll(req, res) {
    return _asyncToGenerator(function* () {
      var rooms = yield _room.default.find().sort({
        createdAt: "desc"
      });
      return res.status(200).send({
        data: rooms
      });
    })();
  },

  create(req, res) {
    return _asyncToGenerator(function* () {
      var room = yield new _room.default({
        roomName: req.body.roomName,
        roomDescription: req.body.roomDescription,
        roomSeatsPlan: req.body.roomSeatsPlan // roomName: 'Test room',
        // roomDescription: 'Lorem ipsum',
        // roomSeatsPlan: [[true,false]]

      }).save();
      return res.status(201).send({
        data: room,
        message: "Room was created"
      });
    })();
  },

  update(req, res, next) {
    return _asyncToGenerator(function* () {
      var room = yield _room.default.find({
        slug: req.params.slug
      });
      if (!room) return next();
      room.roomName = req.body.roomName;
      room.roomDescription = req.body.roomDescription;
      room.roomSeatsPlan = req.body.roomSeatsPlan;
      yield room.save();
      return res.status(200).send({
        data: room,
        message: "Room was updated"
      });
    })();
  },

  remove(req, res, next) {
    return _asyncToGenerator(function* () {
      var room = yield _room.default.findOne({
        slug: req.params.slug
      });
      if (!room) return next();
      yield room.remove();
      return res.status(200).send({
        message: "Room was removed"
      });
    })();
  }

};
exports.default = _default;