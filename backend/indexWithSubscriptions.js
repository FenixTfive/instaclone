//MODIFY USING V4 for subscriptuions(WEBSOCKETS)
const http = require("http");
const jwt = require("./controllers/jwt");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

//load Schema
const typeDefs = require("./apolloTypeDefs");
//load resolvers
const resolvers = require("./apolloResolvers");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3977;
dotenv.config();

const startServer = () => {
  //cors
  app.use(cors());
  //solucion globar de error al usar peticiones con findOneAndUpdate o findOneAndDelete
  // mongoose.set("useFindAndModify", false);
  //oermite la conexion remota desde cualquiere http request
  //app.use(cors);
  mongoose
    .connect(process.env.BBDD, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("conexion exitosa"))
    .catch((err) => {
      console.log("error en la conexion : ", err.stack);
      process.exit(1);
    });

  //SERVIDOR APOLLO para usar graphql
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      // console.log(req.headers);
      if (connection) {
        const token = connection.context.authorization || "";
        try {
          const auth = jwt.verifyToken(token.split(" ")[1]);
          return { auth };
        } catch (error) {
          console.log(error);
        }
      } else {
        const token = req.headers.authorization || "";
        try {
          const auth = jwt.verifyToken(token.split(" ")[1]);
          return { auth };
        } catch (error) {
          console.log(error);
        }
      }
    },
    playground: true,
  });
  server.applyMiddleware({ app });
  const httpserver = http.createServer(app);

  server.installSubscriptionHandlers(httpserver);
  httpserver.listen(port, () => {
    console.log(
      `server listening at http://localhost:${port}${server.graphqlPath}`
    );
  });
  return app;
};

startServer();
