import publicationTable from "../../services/publicationTable.js";
import { GraphQLError } from "graphql";

const resolver = {
  Query: {
    getPublications: (parent, args, context, info) => {
      return publicationTable.getPublications(args.username);
    },
    getFeed: (parent, args, context, info) => {
      return publicationTable.getFeed(context.auth);
    },
  },
  Mutation: {
    publish: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized!");
      return publicationTable.publish(args.file, context.auth);
    },
  },
};

export default resolver;
