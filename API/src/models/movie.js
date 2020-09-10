import mongoose, { Schema } from "mongoose";
import URLSlugs from "mongoose-url-slugs";

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
  seanses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Seanse",
    },
  ],
});

export default mongoose.model("Movie", Movie);
