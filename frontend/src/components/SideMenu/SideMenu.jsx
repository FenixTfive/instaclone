import React from "react";
import logo from "../../assets/instaclone.png";
import { Image, Container, ButtonGroup, Button } from "semantic-ui-react";
import {
  FiHome,
  FiSearch,
  FiCompass,
  FiVideo,
  FiMessageSquare,
  FiHeart,
  FiPlusSquare,
} from "react-icons/fi";
import { Link } from "react-router";
import "./SideMenu.scss";
const SideMenu = () => {
  const menuItems = [
    { icon: <FiHome />, label: "Home", to: "/home" },
    { icon: <FiSearch />, label: "Search", to: "/search" },
    { icon: <FiCompass />, label: "Explore", to: "/explore" },
    { icon: <FiVideo />, label: "Reels", to: "/reels" },
    {
      icon: <FiMessageSquare />,
      label: "Messages",
      to: "/messages",
      badge: true,
    },
    { icon: <FiHeart />, label: "Notifications", to: "/notifications" },
    { icon: <FiPlusSquare />, label: "Create", to: "/create" },
  ];
  return (
    <div className="side-menu">
      <div className="side-menu__logo">
        {" "}
        <Link to="/home">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="side-menu__nav">
        {menuItems.map(({ icon, label, to, badge }) => (
          <Link to={to} className="side-menu__item" key={label}>
            <div className="side-menu__icon">{icon}</div>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
