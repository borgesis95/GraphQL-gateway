import express from "express";
import {ApolloServer, AuthenticationError } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";

import UserAPI from "./dataSource/user.datasource";
import { GraphQLError } from "graphql";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

  }



  public listen() {
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      dataSources :() => {
        return  {
          usersAPI: new UserAPI()
        }
      },

      /* This method of ApolloServer constructor intercept all errors before to get back to client */
      formatError: (error: GraphQLError) => {
        if (error.originalError instanceof AuthenticationError) {
          return new GraphQLError("Not allowed to perform this operation");
        }
  
        // TODO: Add something that send this error on service like kafka 
        return new GraphQLError(`Internal Server Error: ${error.extensions.response.body.message}`);
      },
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Grapqhl-Gateway ready at ${url}`);
    });
  }
}
