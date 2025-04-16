import likeTable from "../../services/likeTable.js";
import { GraphQLError } from "graphql";

const resolver = {
  Query: {
    isLike: (parent, args, context, info) => {
      return likeTable.isLike(args.idPublication, context.auth);
    },
    countLikes: (parent, args, context, info) => {
      return likeTable.countLikes(args.idPublication);
    },
  },
  Mutation: {
    addLike: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return likeTable.addLike(args.idPublication, context.auth);
    },
    deleteLike: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return likeTable.deleteLike(args.idPublication, context.auth);
    },
  },
};
export default resolver;
