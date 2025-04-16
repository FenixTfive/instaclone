const typeDef = `#graphql
  extend type Query {
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFollowing(username: String!): [User]
    getNotFollowers: [User]
  }

  extend type Mutation {
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean
  }
`;
export default typeDef;
