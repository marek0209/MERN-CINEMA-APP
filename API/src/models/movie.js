import mongoose from "mongoose";
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
});

Movie.plugin(URLSlugs("title", { field: "slug", update: true }));

export default mongoose.model("Movie", Movie);
