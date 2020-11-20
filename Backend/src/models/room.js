import mongoose from "mongoose";
import URLSlugs from "mongoose-url-slugs";

const Room = mongoose.Schema(
  {
    roomName: {
      type: String,
      require: true,
    },
    roomDescription: {
      type: String,
      require: true,
    },
    roomSeatsPlan: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

Room.plugin(URLSlugs("roomName", { field: "slug", update: true }));

export default mongoose.model("Room", Room);
