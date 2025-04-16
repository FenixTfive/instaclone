const typeDef = `#graphql
  scalar Upload
  type User {
    id: ID
    name: String
    username: String
    email: String
    avatar: String
    siteWeb: String
    description: String
    password: String
    createAt: String
  }
  extend type Subscription {
    userCreated: User
  }
  #los input es un objeto que recibe muchos datos para ser guardados en las mutations
  #input, recibe datos conforme su estructura
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input UserUpdateInput {
    # name: String
    email: String
    currentPassword: String
    newPassword: String
    siteWeb: String
    description: String
  }

type UserInfo {
  username: String
  email: String
  name: String
}

  type AuthPayload {
    token: String
    userInfo: UserInfo
  }
  type updateAvatar {
    status: Boolean
    urlAvatar: String
  }
  #primary functions
  extend type Query {
    #return 1 user
    getUser(username: String!): User
    search(search: String): [User]
  }
  extend type Mutation {
    #user
    signUp(input: UserInput): User
    signIn(input: LoginInput): AuthPayload
    updateAvatar(file: Upload): updateAvatar
    deleteAvatar: Boolean
    updateUser(input: UserUpdateInput): Boolean
  }
`;
export default typeDef;
