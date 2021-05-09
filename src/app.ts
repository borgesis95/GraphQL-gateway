import express from "express";
import { ApolloServer, gql } from "apollo-server";

import errors from "./middleware/error";

export default class App {
  public app: express.Application;
  public port: number;
  public schema: any;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(errors); // Error Middleware
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    const schema = gql`
      type Query {
        "A simple type for getting started!"
        hello: String
      }
    `;

    // Resolvers
    const resolvers = {
      Query: {
        hello: () => "world",
      },
    };

    const server = new ApolloServer({
      typeDefs : schema,
      resolvers,
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });

  }
}
