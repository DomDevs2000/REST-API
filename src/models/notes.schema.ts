import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    __v: {
      /* Removes Version Number*/
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export { Note };
