import React from "react";
import "./SettingsForm.scss";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";
const SettingsForm = ({
  handleCloseModal,
  setTitleModal,
  setChildrenModal,
  email,
  description,
  siteWeb,
}) => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const handleLogOut = () => {
    dispatch({ type: "RESET_AUTH" });
    handleCloseModal();
    client.clearStore();
  };

  const onPasswordChange = () => {
    setTitleModal("Cambiar contraseña");
    setChildrenModal(<PasswordForm handleLogOut={handleLogOut} />);
  };

  const onEmailChange = () => {
    setTitleModal("Cambiar email");
    setChildrenModal(
      <EmailForm handleCloseModal={handleCloseModal} currentEmail={email} />
    );
  };

  const onDescriptionChange = () => {
    setTitleModal("Actualizar tu biografía");
    setChildrenModal(
      <DescriptionForm
        handleCloseModal={handleCloseModal}
        description={description}
      />
    );
  };
  const onSiteWebChange = () => {
    setTitleModal("Actualizar sitio web");
    setChildrenModal(
      <SiteWebForm handleCloseModal={handleCloseModal} siteWeb={siteWeb} />
    );
  };

  return (
    <div className="settings-form">
      <Button onClick={onPasswordChange}>Cambiar contraseña</Button>
      <Button onClick={onEmailChange}>Cambiar email</Button>
      <Button onClick={onDescriptionChange}>Descripción</Button>
      <Button onClick={onSiteWebChange}>Sitio Web</Button>
      <Button onClick={handleLogOut}>Cerrar Sesión</Button>
      <Button onClick={handleCloseModal}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
