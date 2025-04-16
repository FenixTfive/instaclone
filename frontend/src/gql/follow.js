import { gql } from "@apollo/client";

export const QUERY_IS_FOLLOW = gql`
  query isFollow($username: String!) {
    isFollow(username: $username)
  }
`;

export const QUERY_GET_FOLLOWERS = gql`
  query getFollowers($username: String!) {
    getFollowers(username: $username) {
      name
      username
      avatar
      email
    }
  }
`;
export const QUERY_GET_FOLLOWING = gql`
  query getFollowing($username: String!) {
    getFollowing(username: $username) {
      name
      username
      avatar
    }
  }
`;
export const GET_NOT_FOLLOWERS = gql`
  query getNotFollowers {
    getNotFollowers {
      username
      name
      avatar
    }
  }
`;

export const MUTATION_FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username)
  }
`;

export const MUTATION_UN_FOLLOW = gql`
  mutation unFollow($username: String!) {
    unFollow(username: $username)
  }
`;
