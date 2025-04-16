import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../../Header";
const MainLayout = (props) => {
  // console.log(props.children);
  return (
    <React.Fragment>
      <Header />
      <Container className="main-layout">{props.children}</Container>
    </React.Fragment>
  );
};
export default MainLayout;
