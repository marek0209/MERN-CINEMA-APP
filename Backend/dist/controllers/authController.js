"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _login = _interopRequireDefault(require("../validators/login"));

var _register = _interopRequireDefault(require("../validators/register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  login: function login(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _validateLoginInput, errors, isValid, email, password;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Form validation
              _validateLoginInput = (0, _login["default"])(req.body), errors = _validateLoginInput.errors, isValid = _validateLoginInput.isValid; // Check validation

              if (isValid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json(errors));

            case 3:
              email = req.body.email;
              password = req.body.password; // Find user by email

              _user["default"].findOne({
                email: email
              }).then(function (user) {
                // Check if user exists
                if (!user) {
                  return res.status(404).json({
                    emailnotfound: "Email not found"
                  });
                } // Check password


                _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
                  if (isMatch) {
                    // User password matched
                    // Create JWT Payload
                    var payload = {
                      id: user.id,
                      first_name: user.first_name,
                      email: user.email
                    }; // Sign token

                    _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
                      expiresIn: 3600 // 1 hour

                    }, function (err, token) {
                      res.json({
                        success: true,
                        token: token
                      });
                    });
                  } else {
                    return res.status(400).json({
                      passwordincorrect: "Password incorrect"
                    });
                  }
                });
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  register: function register(req, res, next) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _validateRegisterInpu, errors, isValid;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _validateRegisterInpu = (0, _register["default"])(req.body), errors = _validateRegisterInpu.errors, isValid = _validateRegisterInpu.isValid; // Check validation

              if (isValid) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).json(errors));

            case 3:
              _user["default"].findOne({
                email: req.body.email
              }).then(function (user) {
                if (user) {
                  return res.status(400).json({
                    email: "Email already exists"
                  });
                } else {
                  var newUser = new _user["default"]({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                  }); // Hash password before saving in database

                  _bcryptjs["default"].genSalt(10, function (err, salt) {
                    _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser.save().then(function (user) {
                        return res.json(user);
                      })["catch"](function (err) {
                        return console.log(err);
                      });
                    });
                  });
                }
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};
exports["default"] = _default;