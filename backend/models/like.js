import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = Schema({
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
});

export default mongoose.model("Like", likeSchema);
