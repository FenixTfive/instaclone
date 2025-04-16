import React, { useState, useEffect } from "react";
import "./Followers.scss";
import {
  QUERY_GET_FOLLOWERS,
  QUERY_GET_FOLLOWING,
} from "../../../../gql/follow";
import { useQuery } from "@apollo/client";
import { size } from "lodash";
import BasicModal from "../../../../components/ModalBasic";
import UsersList from "../../UsersList";
const Followers = ({ username, totalPublications }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  //starpolling y stoppolling son para hacer refetch cada cierto tiempo
  //GET FOLLOWERS
  const {
    loading: loadingFollowers,
    data: dataFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(QUERY_GET_FOLLOWERS, {
    variables: { username },
  });

  //GET FOLLOWING
  const {
    loading: loadingFollowing,
    data: dataFollowing,
    startPolling: startPollingFollowing,
    stopPolling: stopPollingFollowing,
  } = useQuery(QUERY_GET_FOLLOWING, {
    variables: { username },
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleModal = (type) => {
    switch (type) {
      case "followers":
        setShowModal(true);
        setTitleModal("Followers");
        setChildrenModal(
          <UsersList
            users={dataFollowers.getFollowers}
            handleCloseModal={handleCloseModal}
          />
        );

        break;
      case "following":
        setShowModal(true);
        setTitleModal("Following");
        setChildrenModal(
          <UsersList
            users={dataFollowing.getFollowing}
            handleCloseModal={handleCloseModal}
          />
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    startPollingFollowers(1000);
    startPollingFollowing(1000);
    return () => {
      stopPollingFollowers();
      stopPollingFollowing();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  if (loadingFollowers || loadingFollowing) return null;

  return (
    <React.Fragment>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> publicaciones
        </p>
        <p className="link" onClick={() => handleModal("followers")}>
          <span>
            {dataFollowers.getFollowers ? size(dataFollowers.getFollowers) : 0}
          </span>{" "}
          seguidores
        </p>
        <p className="link" onClick={() => handleModal("following")}>
          <span>
            {dataFollowing.getFollowing ? size(dataFollowing.getFollowing) : 0}
          </span>{" "}
          seguidos
        </p>
      </div>
      <BasicModal
        show={showModal}
        handleCloseModal={handleCloseModal}
        title={titleModal}
      >
        {childrenModal}
      </BasicModal>
    </React.Fragment>
  );
};

export default Followers;
