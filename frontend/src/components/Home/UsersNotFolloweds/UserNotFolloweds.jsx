import React from "react";
import "./UserNotFolloweds.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router";
import { map } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWERS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/avatar.png";
const UserNotFolloweds = () => {
  const { loading, data } = useQuery(GET_NOT_FOLLOWERS);

  if (loading) return null;
  const { getNotFollowers } = data;
  //   console.log(getNotFollowers);
  return (
    <div className="user-not-followers">
      <h3>Usuarios que no sigues</h3>
      {map(getNotFollowers, (user, index) => (
        <Link
          key={index}
          to={`/${user.username}`}
          className="user-not-followers__user"
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UserNotFolloweds;
