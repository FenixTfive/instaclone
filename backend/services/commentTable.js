import Comment from "../models/comment.js";

// QUERIES
const getComments = (idPublication) => {
  console.log("getting comments");
  console.log(idPublication);
  return new Promise((resolve, reject) => {
    Comment.find({ idPublication }, (err, _comments) => {
      console.log(err);
      if (err) return reject({ message: "Server error" });

      if (_comments !== null) {
        resolve(_comments);
      }
    }).populate("idUser");
  });
};
// MUTATIONS
const addComment = (input, auth) => {
  console.log(auth);
  console.log("creating comment");

  return new Promise((resolve, reject) => {
    let newComment = new Comment({
      idPublication: input.idPublication,
      idUser: auth.id,
      comment: input.comment,
      createAt: Date.now(),
    });
    newComment
      .save()
      .then((res) => resolve(res))
      .catch((err) => {
        console.log(err);
        reject({ message: "Ocurrió un error al crear el comentario" });
      });
  });
};

export default {
  getComments,
  addComment,
};
