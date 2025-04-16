import React, { useEffect } from "react";
import { useParams } from "react-router";
import Profile from "./Profile";
import { useQuery } from "@apollo/client";
import { QUERY_GET_PUBLICATIONS } from "../../gql/publication";
import { size } from "lodash";
import Publications from "../../components/Publications";

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

  return (
    <React.Fragment>
      <Profile username={username} totalPublications={size(publications)} />
      <Publications publications={publications} />
    </React.Fragment>
  );
};
export default User;
