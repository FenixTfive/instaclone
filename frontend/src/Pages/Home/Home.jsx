import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed";
import UserNotFolloweds from "../../components/Home/UsersNotFolloweds";
import "./Home.scss";
const Home = () => {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed></Feed>
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <UserNotFolloweds />
      </Grid.Column>
    </Grid>
  );
};
export default Home;
