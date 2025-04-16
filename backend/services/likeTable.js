import Like from "../models/like.js";

//QUERIES
const isLike = (idPublication, auth) => {
  console.log("checking like status");

  return new Promise((resolve, reject) => {
    Like.findOne({ idPublication, idUser: auth.id }, (err, _result) => {
      if (err) reject({ message: "Error" });
      if (_result !== null) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
const countLikes = (idPublication) => {
  console.log("counting likes");

  return new Promise((resolve, reject) => {
    Like.countDocuments({ idPublication }, (err, _result) => {
      if (err) reject("Error");
      resolve(_result);
    });
  });
};
//MUTATION
const addLike = (idPublication, auth) => {
  console.log("adding like");

  return new Promise((resolve, reject) => {
    const like = new Like({
      idPublication,
      idUser: auth.id,
    });
    like
      .save()
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        return reject(false);
      });
  });
};
const deleteLike = (idPublication, auth) => {
  console.log("delete like");

  return new Promise((resolve, reject) => {
    Like.deleteOne({ idPublication, idUser: auth.id }, (err, _like) => {
      if (err) reject({ message: "Error" });
      if (_like.deletedCount > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export default {
  isLike,
  countLikes,
  addLike,
  deleteLike,
};
