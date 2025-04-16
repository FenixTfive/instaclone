const typeDef = `#graphql
  type Publication {
    _id: ID
    idUser: ID
    file: String
    typeFile: String
    createAt: String
  }

  type FeedPublication {
    _id: ID
    idUser: User
    file: String
    typeFile: String
    createAt: String
  }
  type Publish {
    status: Boolean
    urlFile: String
  }
  extend type Query {
    getPublications(username: String!): [Publication]
    getFeed: [FeedPublication]
  }
  extend type Mutation {
    publish(file: Upload): Publish
  }
`;

export default typeDef;
