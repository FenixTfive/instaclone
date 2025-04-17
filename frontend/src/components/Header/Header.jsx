import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import logo from "../../assets/instaclone.png";
import { Link } from "react-router";
import RightHeader from "./RightHeader";
import "./Header.scss";
import Search from "./Search";
const Header = () => {
  return (
    <div className="header">
      <Container>
        <Grid>
          {/* <Grid.Column width={3} className="header__logo">
            <Link to="/home">
              <Image src={logo} alt="logo" />
            </Link>
          </Grid.Column> */}
          <Grid.Column width={10}>
            <Search />
          </Grid.Column>
          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};
export default Header;
