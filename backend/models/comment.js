import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  idPublication: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Publication",
  },
  idUser: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  comment: {
    type: String,
    trim: true,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("Comment", CommentSchema);
