import { gql } from "@apollo/client";

export const GET_FEED = gql`
  query getFeed {
    getFeed {
      _id
      idUser {
        id
        username
        avatar
        name
      }
      file
      typeFile
      createAt
    }
  }
`;

export const QUERY_GET_PUBLICATIONS = gql`
  query getPublications($username: String!) {
    getPublications(username: $username) {
      _id
      idUser
      file
      typeFile
      createAt
    }
  }
`;

export const MUTATION_PUBLISH = gql`
  mutation publish($file: Upload) {
    publish(file: $file) {
      status
      urlFile
    }
  }
`;
