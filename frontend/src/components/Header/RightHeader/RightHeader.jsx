import React, { useState } from "react";
import "./RightHeader.scss";
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router";
import ImageNotFound from "../../../assets/avatar.png";
import { useQuery } from "@apollo/client";
import queries from "../../../gql/user";
import { useSelector } from "react-redux";
import ModalUpload from "../../ModalUpload";

const RightHeader = () => {
  const [show, setShow] = useState(false);

  const auth = useSelector((state) => state.authReducer.auth);

  const GET_USER = queries.query_getUser;

  const { error, loading, data } = useQuery(GET_USER, {
    variables: { username: auth.userInfo.username },
  });
  if (error || loading) return null;
  // console.log(data);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <div className="right-header">
        <Link to="/home">
          <Icon name="home" />
        </Link>
        <Icon name="plus" onClick={handleOpen} />
        <Link to={`/${auth.userInfo.username}`}>
          <Image
            src={data.getUser.avatar ? data.getUser.avatar : ImageNotFound}
            avatar
          />
        </Link>
      </div>
      <ModalUpload show={show} handleClose={handleClose} />
    </React.Fragment>
  );
};
export default RightHeader;
