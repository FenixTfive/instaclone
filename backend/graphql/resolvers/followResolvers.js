import { GraphQLError } from "graphql";
import followTable from "../../services/followTable.js";

const resolver = {
  Query: {
    isFollow: (parent, args, context, info) => {
      return followTable.isFollow(args.username, context.auth);
    },
    getFollowers: (parent, args, context, info) => {
      return followTable.getFollowers(args.username);
    },
    getFollowing: (parent, args, context, info) => {
      return followTable.getFollowing(args.username);
    },
    getNotFollowers: (parent, args, context, info) => {
      return followTable.getNotFollowers(context.auth);
    },
  },
  Mutation: {
    follow: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return followTable.follow(args.username, context.auth);
    },
    unFollow: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return followTable.unFollow(args.username, context.auth);
    },
  },
};

export default resolver;
