import express from "express";
import jwt from "./utils/jwt.js";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "node:http";
import bodyParser from "body-parser";
// this is for managing http server shutdown
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

//load Schema
import typeDefs from "./apolloTypeDefs.js";
//load resolvers
import resolvers from "./apolloResolvers.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);
  const port = process.env.PORT || 3977;

  //solucion globar de error al usar peticiones con findOneAndUpdate o findOneAndDelete
  //not longer needed in mongoose >=6
  // mongoose.set("useFindAndModify", false);
  await mongoose
    .connect(process.env.BBDD, {
      // useNewUrlParser: true,//not needed in mongoose >=6
      // useUnifiedTopology: true,//not needed in mongoose >=6
      // useFindAndModify: true, //not needed in mongoose >=6
      // useCreateIndex: true, //not needed in mongoose >=6
    })
    .then(() => console.log("successfull connetion to mongodb"))
    .catch((err) => {
      console.log("error in mongo connection : ", err.stack);
      process.exit(1);
    });

  //SERVIDOR APOLLO para usar graphql
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, //remove in production
    graphql: true, //remove in production
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors(), //cors for express
    bodyParser.json(), //express json parser
    expressMiddleware(server, {
      context: async ({ req }) => {
        // console.log(req.headers);
        const token = req.headers.authorization || "";
        if (token) {
          try {
            const auth = await jwt.verifyToken(token.split(" ")[1]);

            return { auth };
          } catch (error) {
            console.log(error);
          }
        }
      },
    })
  );

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `Servidor GraphQL funcionando en http://localhost:${port}/graphql`
  );
};

startServer();
