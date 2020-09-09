"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _login = _interopRequireDefault(require("../validators/login"));

var _register = _interopRequireDefault(require("../validators/register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  login(req, res, next) {
    return _asyncToGenerator(function* () {
      // Form validation
      var {
        errors,
        isValid
      } = (0, _login.default)(req.body); // Check validation

      if (!isValid) {
        return res.status(400).json(errors);
      }

      var email = req.body.email;
      var password = req.body.password; // Find user by email

      _user.default.findOne({
        email
      }).then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({
            emailnotfound: "Email not found"
          });
        } // Check password


        _bcryptjs.default.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User password matched
            // Create JWT Payload
            var payload = {
              id: user.id,
              first_name: user.first_name,
              email: user.email
            }; // Sign token

            _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
              expiresIn: 3600 // 1 hour

            }, (err, token) => {
              res.json({
                success: true,
                token
              });
            });
          } else {
            return res.status(400).json({
              passwordincorrect: "Password incorrect"
            });
          }
        });
      });
    })();
  },

  register(req, res, next) {
    return _asyncToGenerator(function* () {
      var {
        errors,
        isValid
      } = (0, _register.default)(req.body); // Check validation

      if (!isValid) {
        return res.status(400).json(errors);
      }

      _user.default.findOne({
        email: req.body.email
      }).then(user => {
        if (user) {
          return res.status(400).json({
            email: "Email already exists"
          });
        } else {
          var newUser = new _user.default({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
          }); // Hash password before saving in database

          _bcryptjs.default.genSalt(10, (err, salt) => {
            _bcryptjs.default.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(user => res.json(user)).catch(err => console.log(err));
            });
          });
        }
      });
    })();
  }

};
exports.default = _default;