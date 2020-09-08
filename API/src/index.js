import express from "express";
import cors from "cors";
import config from "../config/config";
import bodyParser from "body-parser";
// Connect to database
import dbConfig from "../config/database";
import mongoose from "mongoose";

mongoose.connect(dbConfig.mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.server.port, () => {
  console.log(`API server works at port:` + config.server.port);
});
