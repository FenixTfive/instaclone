import React, { useEffect } from "react";
import { useParams } from "react-router";
import Profile from "./Profile";
import { useQuery } from "@apollo/client";
import { QUERY_GET_PUBLICATIONS } from "../../gql/publication";
import { size } from "lodash";
import Publications from "../../components/Publications";
import { Tab, TabPane } from "semantic-ui-react";
import "./User.scss";

const User = () => {
  const { username } = useParams();

  const { loading, data, startPolling, stopPolling } = useQuery(
    QUERY_GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, []);

  if (loading) return "Cargando...";

  const { getPublications: publications } = data;

  const panes = [
    {
      menuItem: "POSTS",
      render: () => <Publications publications={publications} />,
    },
    {
      menuItem: "REELS",
      render: () => <TabPane attached={false}>reels</TabPane>,
    },
    {
      menuItem: "SAVED",
      render: () => <TabPane attached={false}>saved</TabPane>,
    },
    {
      menuItem: "TAGGED",
      render: () => <TabPane attached={false}>Tagged</TabPane>,
    },
  ];

  return (
    <React.Fragment>
      <Profile username={username} totalPublications={size(publications)} />

      <Tab
        className="tabs"
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </React.Fragment>
  );
};
export default User;
