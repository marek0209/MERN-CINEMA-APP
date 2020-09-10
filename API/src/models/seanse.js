import mongoose, { Schema } from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const Seanse = mongoose.Schema({
  date: {
    type: Date,
    require: true,
  },
  hour: {
    type: String,
    require: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  bookings: {
    type: Array,
    require: true,
  },
});

export default mongoose.model("Seanse", Seanse);
