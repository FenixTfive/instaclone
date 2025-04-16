import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query getCommets($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      idUser {
        username
        avatar
      }
      comment
    }
  }
`;

export const MUTATION_ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      comment
      createAt
    }
  }
`;
