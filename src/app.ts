import express from "express";
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";

import errors from "./middleware/error";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(errors); // Error Middleware
  }

  public listen() {
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Grapqhl-Gateway ready at ${url}`);
    });
  }
}
