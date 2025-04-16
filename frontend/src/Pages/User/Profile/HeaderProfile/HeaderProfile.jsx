import React from "react";
import "./HeaderProfile.scss";
import { Button } from "semantic-ui-react";
import {
  QUERY_IS_FOLLOW,
  MUTATION_UN_FOLLOW,
  MUTATION_FOLLOW,
} from "../../../../gql/follow";
import { useQuery, useMutation } from "@apollo/client";
//username comes from the url, can be from other user
//ownerInfo is our profile information
const HeaderProfile = ({ username, ownerInfo, handleModal }) => {
  const { loading, data } = useQuery(QUERY_IS_FOLLOW, {
    variables: { username },
  });

  const [unfollow] = useMutation(MUTATION_UN_FOLLOW, {
    onCompleted: async (data) => {
      console.log("unfollow", data);
    },
  });

  const [follow] = useMutation(MUTATION_FOLLOW, {
    onCompleted: async (data) => {
      console.log("follow", data);
    },
  });

  const followButton = () => {
    if (data.isFollow) {
      return (
        <Button onClick={() => handleUnFollow()} className="btn-danger">
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button onClick={() => handleFollow()} className="btn-action">
          Seguir
        </Button>
      );
    }
  };

  const handleFollow = () => {
    follow({
      variables: { username },
      refetchQueries: [{ query: QUERY_IS_FOLLOW, variables: { username } }],
    });
  };
  const handleUnFollow = () => {
    unfollow({
      variables: { username },
      refetchQueries: [{ query: QUERY_IS_FOLLOW, variables: { username } }],
    });
  };

  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === ownerInfo.username ? (
        <Button onClick={() => handleModal("settings")}>Ajustes</Button>
      ) : (
        !loading && followButton()
      )}
    </div>
  );
};
export default HeaderProfile;
