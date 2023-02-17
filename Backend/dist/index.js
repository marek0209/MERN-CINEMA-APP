"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("../config/config"));

var _rooms = _interopRequireDefault(require("./routes/rooms"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _movies = _interopRequireDefault(require("./routes/movies"));

var _seanses = _interopRequireDefault(require("./routes/seanses"));

var _database = _interopRequireDefault(require("../config/database"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: ".env"
});

console.log("Secret for JWT: ", process.env.JWT_SECRET);

_mongoose["default"].connect(_database["default"].mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connection.on("error", function (err) {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json()); // routes config

app.use("/api/rooms", (0, _rooms["default"])());
app.use("/api/auth", (0, _auth["default"])());
app.use("/api/movies", (0, _movies["default"])());
app.use("/api/seanses", (0, _seanses["default"])());
app.listen(process.env.PORT || 5005, function () {
  console.log("API server works at port:" + process.env.PORT);
});