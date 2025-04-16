import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import instaclone from "../../assets/instaclone.png";
import "./Auth.scss";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginFom";
const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <Container fluid className="auth">
      <Image src={instaclone} />
      <div className="container-form">
        {showLogin === true ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="change-form">
        <p>
          {showLogin === true ? (
            <React.Fragment>
              No tienes cuenta?{" "}
              <span onClick={() => setShowLogin(!showLogin)}> Registrate</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Ya tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>
                {" "}
                Inicia sesion
              </span>
            </React.Fragment>
          )}
        </p>
      </div>
    </Container>
  );
};
export default Auth;
