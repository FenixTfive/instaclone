import React from "react";
import "./UserNotFound.scss";
import { Link } from "react-router";
const UserNotFound = () => {
  return (
    <div className="user-not-found">
      <p>Usuario no encontrado</p>
      <p>
        Es pposible que el enlace sea incorrecto o el usuario haya eliminado su
        cuenta
      </p>
      <Link to="/home">volver al inicio</Link>
    </div>
  );
};
export default UserNotFound;
