import userTable from "../../services/userTable.js";
//authenticationError not exits, war replaced by apolloError, but later replaced by GraphQLError
import { GraphQLError } from "graphql";

import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

const USER_CREATED = "USER_CREATED ";

const resolver = {
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED]),
    },
  },
  Query: {
    getUser: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");

      return userTable.getUser(args.username);
    },
    search: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      console.log("searching users");
      return userTable.search(args.search);
    },
  },
  Mutation: {
    signUp: (parent, args, context, info) => {
      console.log("registrando", args);
      // pubsub.publish(USER_CREATED, { userCreated: args.input });
      return userTable.signUp(args.input);
    },
    signIn: (parent, args, context, info) => {
      // console.log("logueando", args);
      return userTable.signIn(args.input);
    },
    updateAvatar: (parent, args, context, info) => {
      console.log(context);
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return userTable.updateAvatar(args.file, context.auth);
    },
    deleteAvatar: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return userTable.deleteAvatar(context.auth);
    },
    updateUser: (parent, args, context, info) => {
      if (!context.auth) throw new GraphQLError("unAuthorized");
      return userTable.updateUser(args.input, context.auth);
    },
  },
};

export default resolver;
