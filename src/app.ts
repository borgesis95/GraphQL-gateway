import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";
import Redis from "ioredis";

import UserAPI from "./dataSource/user.datasource";
import EventAPI from "./dataSource/event.datasource";
import { GraphQLError } from "graphql";
import RedisDataSource from "./dataSource/redis.datasource";

export default class App {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.GATEWAY_PORT);
  }

  public listen() {
    const redis = new Redis("redis",{
      port: parseInt(process.env.REDIS_PORT), // Redis port
    });

    const server = new ApolloServer({
      introspection: true,
      typeDefs: schema,
      resolvers,
      context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || "";

        // Add the user to the context
        const isUserOnRedis = await redis.get(token);
        return { user: isUserOnRedis ? JSON.parse(isUserOnRedis) : null };
      },

      dataSources: () => {
        return {
          usersAPI: new UserAPI(),
          eventsAPI: new EventAPI(),
          redisSource: new RedisDataSource(redis),
        };
      },

      /* This method of ApolloServer constructor intercept all errors before to get back to client */
      formatError: (error: GraphQLError) => {
        console.log("error", error);
        if (error.originalError instanceof AuthenticationError) {
          return new GraphQLError("Not allowed to perform this operation");
        }

        console.log("error", error);
        if (error && error.extensions && error.extensions.response) {
          return new GraphQLError(
            `Internal Server Error: ${error.extensions.response.body.message}`
          );
        } else {
          return new GraphQLError(error.message);
        }
      },
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Grapqhl-Gateway ready at ${url}`);
    });
  }
}
