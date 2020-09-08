"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("../config/config"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("../config/database"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to database
_mongoose.default.connect(_database.default.mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

_mongoose.default.Promise = global.Promise;

_mongoose.default.connection.on("error", err => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.listen(_config.default.server.port, () => {
  console.log("API server works at port:" + _config.default.server.port);
});