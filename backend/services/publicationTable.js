import Publication from "../models/publication.js";
import User from "../models/user.js";
import Follow from "../models/follow.js";
import awsUpload from "../utils/aws-upload-image.js";
import moment from "moment";

//QUERIES
const getPublications = async (username) => {
  console.log("getting publications");

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return { message: "User not found" }; //si no existe el usuario
    }

    const publications = await Publication.find({ idUser: user._id }).sort({
      createAt: -1,
    });

    return publications;
  } catch (error) {
    console.log(error);
    return { message: "Server error" };
  }
};

const getFeed = async (auth) => {
  console.log("getting feed");
  // console.log(auth);

  try {
    const folled = await Follow.find({ idUser: auth.id }).populate("follow");
    const followedList = [];
    const publicationList = [];

    for (const data of folled) {
      followedList.push(data.follow);
    }
    for (const data of followedList) {
      const _publications = await Publication.find({ idUser: data._id })
        .sort({ createAt: -1 })
        .populate("idUser");

      publicationList.push(..._publications);
    }
    const finalFeed = publicationList.sort((a, b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    });
    return finalFeed;
  } catch (error) {
    console.log(error);
    return { message: "Server error" };
  }
};
//MUTATIONS

const publish = (file, auth) => {
  return new Promise(async (resolve, reject) => {
    //se usa async para resolver la promesa que envia el file

    const { mimetype, createReadStream } = await file;
    const extension = mimetype.split("/")[1];
    const fileName = `publication/${moment().unix()}.${extension}`;
    const fileData = createReadStream();

    try {
      const result = await awsUpload.awsUploadImage(fileData, fileName);
      // console.log(result);
      let newPublication = new Publication({
        idUser: auth.id,
        file: result,
        typeFile: mimetype.split("/")[0],
        createAt: Date.now(),
      });

      newPublication.save().then(() =>
        resolve({
          status: true,
          urlFile: result,
        })
      );
    } catch (error) {
      console.log(error);
      reject({
        status: false,
        urlFile: null,
      });
    }
  });
};

export default {
  getPublications,
  getFeed,
  publish,
};
