import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "../../../gql/publication";
import ImageNotFound from "../../../assets/avatar.png";
import Actions from "../../ModalPublication/Actions";
import CommentForm from "../../ModalPublication/CommentForm";
import ModalPublication from "../../ModalPublication";
import "./Feed.scss";
const Feed = () => {
  const [show, setShow] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);
  const { loading, data, startPolling, stopPolling } = useQuery(GET_FEED);

  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;

  const { getFeed: feed } = data;

  return (
    <React.Fragment>
      <div className="feed">
        {feed.map((publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${publication.file}")` }}
              onClick={() => openPublication(publication)}
            />
            <div className="feed__box-actions">
              <Actions publication={publication} />
            </div>
            <div className="feed__box-form">
              <CommentForm idPublication={publication._id} />
            </div>
          </div>
        ))}
      </div>
      {show && (
        <ModalPublication
          show={show}
          handleClose={handleClose}
          publication={publicationSelect}
        ></ModalPublication>
      )}
    </React.Fragment>
  );
};

export default Feed;
