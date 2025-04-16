import { gql } from "@apollo/client";

//QUERIES
const query_getUser = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      name
      username
      email
      avatar
      siteWeb
      description
      createAt
    }
  }
`;
const query_search = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      email
      avatar
    }
  }
`;
//MUTATIONS
const mutation_signUp = gql`
  mutation signUp($input: UserInput) {
    signUp(input: $input) {
      name
      username
    }
  }
`;
const mutation_signIn = gql`
  mutation signIn($input: LoginInput) {
    signIn(input: $input) {
      token
      userInfo {
        username
        email
        name
      }
    }
  }
`;
const mutation_update_avatar = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;
const mutation_delete_avatar = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;
const mutation_update_user = gql`
  mutation updateUser($input: UserUpdateInput) {
    updateUser(input: $input)
  }
`;
export default {
  query_getUser,
  query_search,
  mutation_signUp,
  mutation_signIn,
  mutation_update_avatar,
  mutation_delete_avatar,
  mutation_update_user,
};
