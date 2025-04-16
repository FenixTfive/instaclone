import commentTable from "../../services/commentTable.js";
import { GraphQLError } from "graphql";

const resolver = {
  Query: {
    getComments: (parent, args, context, info) => {
      return commentTable.getComments(args.idPublication);
    },
  },
  Mutation: {
    addComment: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAthorized");
      return commentTable.addComment(args.input, context.auth);
    },
  },
};

export default resolver;
