import mongoose from "mongoose";
const Schema = mongoose.Schema;

const publicationSchema = Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  file: {
    type: String,
    trim: true,
    require: true,
  },
  typeFile: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Publication", publicationSchema);
