import express from "express";
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";

import errors from "./middleware/error";
import UserAPI from "./dataSource/user.datasource";

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
      dataSources :() => {
        return  {
          usersAPI: new UserAPI()
        }
      }
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Grapqhl-Gateway ready at ${url}`);
    });
  }
}
