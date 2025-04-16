import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import awsUpload from "../utils/aws-upload-image.js";
import moment from "moment";
// QUERIES
const getUser = async (username) => {
  console.log(".................getUser");

  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    return { message: "server error" };
  }
};
//BBUSCADOR DE USUARIOS
///los refijos    $regex y $options sirven para hacer una busqueda por match
//es decir ---> $regex BUSCA RESULTADOS SIMILARES CON LA PALABRA O LETRAS QUE LE AGREGUES
////----------> $options pueden ser "i" , "m" etc.. pero "i sirve para estos propósitos
//BUSCAR MAS EN MONGOOSE.COM"
const search = async (search) => {
  console.log(".................searching users");

  try {
    const users = await User.find({ name: { $regex: search, $options: "i" } });
    return users;
  } catch (error) {
    return { message: "server error" };
  }
};
//MUTATIONS
const signUp = async ({ email, username, name, password, confirmPassword }) => {
  console.log("....................signUp");

  if (password !== confirmPassword) {
    return { message: "Las contraseñas no coinciden" };
  }

  try {
    const userFound = await User.findOne({
      email,
      username,
    });
    if (userFound) {
      return { message: "El email o username ya esta siendo utilizado" };
    } else {
      const newUser = new User({
        name,
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      await newUser.save();
      return newUser;
    }
  } catch (error) {
    return { message: "Error en el servidor" };
  }
};

const signIn = async ({ email, password }) => {
  console.log("....................signIn");

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) throw new Error("User not found");

    const pwMatches = bcrypt.compareSync(password, user.password);

    if (!pwMatches) throw new Error("Password not match");

    const auth = {
      token: jwt.signInToken(user),
      userInfo: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
    };

    return auth;
  } catch (error) {
    return { message: "Error en el servidor" };
  }
};

const updateAvatar = (file, auth) => {
  //file retorna una Promise, por eso debems usar async  y await
  console.log(file);
  return new Promise(async (resolve, reject) => {
    //(1) hacer destructuring
    const { mimetype, createReadStream } = await file; //es impportante el await o causara error
    //(2) obtener la extension de la imagen recivida
    const extension = mimetype.split("/")[1];
    //(3) nuevo nombre , para avatar unico debtro de la carpeta "avatar"
    // const newName = `avatar/${auth.id}.${extension}`;
    const newName = `avatar/${moment().unix()}-${auth.id}.${extension}`;

    //informacion del archivo
    const fileData = createReadStream();

    // //GUARDADO DE IMAGEN EN AWS
    // try {
    //   const result = await awsUpload.awsUploadImage(fileData, newName);
    //   const _user = await User.findById({ _id: auth.id });
    //   if (_user) {
    //     _user.avatar = result;
    //     _user.save();
    //   }
    //   return {
    //     status: true,
    //     urlAvatar: result,
    //   };
    // } catch (error) {
    //   console.log(error);

    //   return { status: false, urlAvatar: null };
    // }
  });
};

const deleteAvatar = (auth) => {
  console.log("delete avatar");
  return new Promise((resolve, reject) => {
    User.findById({ _id: auth.id }, (err, _user) => {
      if (err) {
        console.log("false");
        reject(false);
      }
      if (_user !== null) {
        _user.avatar = "";
        _user
          .save()
          .then((response) => {
            console.log("true");
            resolve(true);
          })
          .catch((err) => {
            reject(false);
          });
      }
    });
  });
};

const updateUser = (input, auth) => {
  console.log("updating user info");
  return new Promise((resolve, reject) => {
    User.findById({ _id: auth.id }, (err, _user) => {
      if (err) {
        reject(false);
      }
      if (_user !== null) {
        if (input.currentPassword && input.newPassword) {
          if (
            bcrypt.compareSync(input.currentPassword, _user.password) !== false
          ) {
            console.log("new password saved");
            _user.password = bcrypt.hashSync(input.newPassword, 10);
          }
        } else {
          console.log("new data save");
          // input.name && (_user.name = input.name);
          input.email && (_user.email = input.email);
          input.description && (_user.description = input.description);
          input.siteWeb && (_user.siteWeb = input.siteWeb);
        }
        _user
          .save()
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      }
    });
  });
};

export default {
  getUser,
  signUp,
  signIn,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search,
};
