import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";
import { BaseRedisCache } from "apollo-server-cache-redis";
import Redis from "ioredis";

import UserAPI from "./dataSource/user.datasource";
import { GraphQLError } from "graphql";
import RedisDataSource from "./dataSource/redis.datasource";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public listen() {
    const redis = new Redis({
      port: 6379, // Redis port
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
          redisSource: new RedisDataSource(redis),
        };
      },

      /* This method of ApolloServer constructor intercept all errors before to get back to client */
      formatError: (error: GraphQLError) => {
        if (error.originalError instanceof AuthenticationError) {
          return new GraphQLError("Not allowed to perform this operation");
        }
        // TODO: Add something that send this error on service like kafka
        return new GraphQLError(
          `Internal Server Error: ${error.extensions.response.body.message}`
        );
      },
    });

    server.listen(this.port).then(({ url }) => {
      console.log(`🚀 Grapqhl-Gateway ready at ${url}`);
    });
  }
}
