import mongoose from "mongoose";
const Schema = mongoose.Schema;

const followSchema = Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  follow: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Follow", followSchema);
