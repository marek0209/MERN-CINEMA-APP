import mongoose, { Schema } from "mongoose";

const Seanse = mongoose.Schema({
  date: {
    type: String,
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
