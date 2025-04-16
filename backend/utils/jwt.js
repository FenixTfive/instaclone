import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.SECRET_KEY;

const signInToken = (user) => {
  //importante no pasar el password en la generacion del token
  //porque si lo obtienen , podran ver toda la info
  const { id, name, username, email } = user;
  const payload = {
    id,
    // name,
    // username,
    // email,
  };
  const token = jwt.sign(payload, secret_key, { expiresIn: "60 days" });
  return token;
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      resolve("");
    } else {
      try {
        let tokenDecoded = jwt.verify(token, secret_key);
        resolve(tokenDecoded);
      } catch (error) {
        console.log(error);
        resolve("");
      }
    }
  });
};

export default {
  signInToken,
  verifyToken,
};
