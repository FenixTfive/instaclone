import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import "./Profile.scss";
import { useQuery } from "@apollo/client";
import queries from "../../../gql/user";
import { useSelector } from "react-redux";
import UserNotFound from "../../UserNotFound";
import ImageNotFound from "../../../assets/avatar.png";
import ModalBasic from "../../../components/ModalBasic";
import AvatarForm from "../AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingForm from "../SettingsForm";
import Followers from "./Followers";
const Profile = ({ username, totalPublications }) => {
  const userInfo = useSelector((state) => state.authReducer.auth.userInfo);

  const [titleModal, setTitleModal] = useState("");

  const [childrenModal, setChildrenModal] = useState(null);

  const [show, setShow] = useState(false);

  const QUERY_GET_USER = queries.query_getUser;

  const { loading, error, data } = useQuery(QUERY_GET_USER, {
    variables: { username },
  });

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleModal = (typeModal) => {
    switch (typeModal) {
      case "avatar":
        setShow(true);
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm
            handleCloseModal={handleCloseModal}
            username={userInfo.username}
          />
        );
        break;
      case "settings":
        setShow(true);
        setTitleModal("");
        setChildrenModal(
          <SettingForm
            handleCloseModal={handleCloseModal}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
            email={data.getUser.email}
            description={data.getUser.description}
            siteWeb={data.getUser.siteWeb}
          />
        );
        break;

      default:
        break;
    }
  };

  if (loading) return "loading";
  if (error) return <UserNotFound />;

  return (
    <React.Fragment>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={data.getUser.avatar ? data.getUser.avatar : ImageNotFound}
            avatar
            onClick={() =>
              username === userInfo.username && handleModal("avatar")
            }
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile
            username={username}
            ownerInfo={userInfo}
            handleModal={handleModal}
          />
          <Followers
            username={username}
            totalPublications={totalPublications}
          />
          <div className="other">
            <div className="name"> {data.getUser.name}</div>
            {data.getUser.siteWeb && (
              <a
                href={data.getUser.siteWeb}
                className="siteWeb"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.getUser.siteWeb}
              </a>
            )}
            {data.getUser.description && (
              <p className="description">{data.getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic
        show={show}
        handleCloseModal={handleCloseModal}
        title={titleModal}
      >
        {childrenModal}
      </ModalBasic>
    </React.Fragment>
  );
};
export default Profile;
