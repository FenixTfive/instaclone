import React from "react";
import logo from "../../assets/instaclone.png";
import { Image, Container } from "semantic-ui-react";
import { Link } from "react-router";
import "./SideMenu.scss";
const SideMenu = () => {
  return (
    <div className="side">
      <div className="side__logo">
        <Link to="/home">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
