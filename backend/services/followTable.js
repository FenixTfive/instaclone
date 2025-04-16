import Follow from "../models/follow.js";
import User from "../models/user.js";

// QUERY
const isFollow = (username, auth) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, _user) => {
      if (err) reject({ message: "server error" });
      if (_user !== null) {
        Follow.findOne(
          { idUser: auth.id, follow: _user.id },
          (err, _follow) => {
            if (err) reject({ message: "server error" });
            if (_follow !== null) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      } else {
        reject({ message: "El usuario no existe" });
      }
    });
  });
};

const getFollowers = async (username) => {
  //username es mi propio nombre de usuario, del dueño de la cuenta
  console.log("getting my followers");

  //       ///////////importante////////
  //       //Para usar la propiedad populate, debemos referenciar el modelo follow a la tabla o documento llamdado "user"
  //       //o como lo hayamos llamado... ver linea 44,en ./models/user.js
  //       //esto sustituira el id de "idUser" por todos sus datos contenidos en su documento "user"
  //       // es decir:
  //       // {
  //       //   createAt: 2020-09-06T21:11:41.093Z,
  //       //   _id: 5f55510f2c6abc44c4730fb9,
  //       //   idUser: {      <------------------------------ASI COMO INICIA AQUI
  //       //     createAt: 2020-08-23T21:30:43.998Z,
  //       //     _id: 5f42e015976a1e03fc739016,
  //       //     name: 'sebastian rocha ',
  //       //     username: 'XxFenixX12',
  //       //     email: 'sebastianrochaortega@gmail.com',
  //       //     password: '$2a$10$jtISvvDqaOS.2k7X6tkPAeluqIllp8YXsCWCYqlLEnZM/FGKO7T0W',
  //       //     __v: 0,
  //       //     avatar: 'https://s3.amazonaws.com/instagram.clone/avatar/1599423289-5f42e015976a1e03fc739016.jpeg'
  //       //   },             <------------------------------Y TERMINA AQUI
  //       //   follow: 5f3eeebe722255220c69117f,
  //       //   __v: 0
  //       // }
  try {
    const user = await User.find({ username });

    if (user !== null) {
      const followers = await Follow.find({ follow: user._id }).populate(
        "idUser"
      );
      let followersList = [];
      for (const data of followers) {
        //arreglo con la informacion de todos los followers
        followersList.push(data.idUser);
      }
      return followersList;
    } else {
      return { message: "usuario no encontrado" };
    }
  } catch (error) {
    console.log(error);
    return { message: "server error" };
  }
};

const getFollowing = async (username) => {
  console.log("getting following");

  try {
    const user = await User.find({ username });
    if (user !== null) {
      const following = await Follow.find({ idUser: user._id }).populate(
        "follow"
      );
      let followingList = [];
      for (const data of following) {
        //arreglo con la informacion de todos los followers
        followingList.push(data.follow);
      }
      return followingList;
    } else {
      return { message: "usuario no encontrado" };
    }
  } catch (error) {
    console.log(error);
    return { message: "server error" };
  }
};

const getNotFollowers = (auth) => {
  console.log("getting unfollow users");

  return new Promise(async (resolve, reject) => {
    const users = await User.find().limit(50);
    const arrayUsers = [];

    for await (const user of users) {
      //comprobamos si seguimos al usuario
      const isFind = await Follow.findOne({ idUser: auth.id })
        .where("follow")
        .equals(user._id);

      //si no lo seguimos , podemos agregar el "user"
      if (!isFind) {
        // console.log(user);
        //en la lista aparecerá nuestro usuario , asia que lo restringimos
        if (user._id.toString() !== auth.id.toString()) {
          arrayUsers.push(user);
        }
      }
    }
    console.log(arrayUsers);
    resolve(arrayUsers);
  });
};

//MUTATIONS
const follow = (username, auth) => {
  // console.log(username);
  console.log("following");
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, _user) => {
      if (err) {
        reject(false);
      }
      if (_user !== null) {
        const newFollower = new Follow({
          idUser: auth.id,
          follow: _user._id,
        });
        newFollower
          .save()
          .then((response) => {
            console.log(response);
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      } else {
        reject(false);
      }
    });
  });
};

const unFollow = (username, auth) => {
  console.log("unfollowing");
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, _user) => {
      if (err) reject({ message: "server error" });
      if (_user !== null) {
        Follow.deleteOne(
          { idUser: auth.id, follow: _user._id },
          (err, _follow) => {
            if (err) reject({ message: "server error" });
            if (_follow.deletedCount > 0) {
              //si hace el delete auque no existan registros , pero solo la propiedad "deleteCount" nos indica si verdaderamente hizo alguno
              // console.log(_follow);
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      } else {
        reject({ message: "el usuario no existe" });
      }
    });
  });
};
export default {
  isFollow,
  getFollowers,
  getFollowing,
  getNotFollowers,
  follow,
  unFollow,
};
