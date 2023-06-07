import mongoose from "mongoose";

const Note = mongoose.model(
  "Note",
  mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter a note title"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Please enter a note description"],
      trim: true,
    },
    date: { type: Date, default: Date.now },
  })
);

export default Note;
