import React from "react";
import "./UsersList.scss";
import { size, map } from "lodash";
import { Image } from "semantic-ui-react";
import imageNotFound from "../../../assets/avatar.png";
import { useNavigate } from "react-router";
const UserList = ({ users, handleCloseModal }) => {
  // console.log(users);
  let history = useNavigate();

  const goToUser = (username) => {
    handleCloseModal();
    history.push(`/${username}`);
  };

  return (
    <div className="users-list">
      {size(users) === 0 ? (
        <p className="users-list__not-users">No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            key={index}
            className="users-list__user"
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || imageNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
            {/* <Button className="btn-action" >seguir</Button> */}
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
