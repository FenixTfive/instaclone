const typeDef = `#graphql
  extend type Query {
    isLike(idPublication: ID!): Boolean
    countLikes(idPublication: ID!): Int
  }
  extend type Mutation {
    addLike(idPublication: ID!): Boolean
    deleteLike(idPublication: ID!): Boolean
  }
`;

export default typeDef;
