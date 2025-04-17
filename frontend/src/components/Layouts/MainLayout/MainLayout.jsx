import React from "react";
import { Container, Grid } from "semantic-ui-react";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
const MainLayout = (props) => {
  // console.log(props.children);
  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width={4}>
          <SideMenu />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header />
          <Container className="main-layout">{props.children}</Container>
        </Grid.Column>
      </Grid>
      {/* <Header />
      <Container className="main-layout">{props.children}</Container> */}
    </React.Fragment>
  );
};
export default MainLayout;
