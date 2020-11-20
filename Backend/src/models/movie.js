import mongoose, { Schema } from "mongoose";

const Movie = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  movieDescription: {
    type: String,
    require: true,
  },
  movieImgUrl: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Movie", Movie);
