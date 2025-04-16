const typeDef = `#graphql
  type Comment {
    idPublication: ID!
    idUser: User
    comment: String
    createAt: String
  }
  input CommentInput {
    idPublication: ID
    comment: String
  }
  extend type Query {
    getComments(idPublication: ID!): [Comment]
  }
  extend type Mutation {
    addComment(input: CommentInput): Comment
  }
`;
export default typeDef;
