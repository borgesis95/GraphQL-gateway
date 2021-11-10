import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server";
import schema from "./schema";
import resolvers from "./resolvers";
import Redis from "ioredis";

import UserAPI from "./dataSource/user.datasource";
import EventAPI from "./dataSource/event.datasource";
import { GraphQLError } from "graphql";
import RedisDataSource from "./dataSource/redis.datasource";
import { verify } from "./utils";
import { decode } from "jsonwebtoken";

export default class App {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.GATEWAY_PORT);
  }

  public listen() {
    const redis = new Redis(process.env.REDIS_HOST, {
      port: parseInt(process.env.REDIS_PORT), // Redis port
    });

    const server = new ApolloServer({
      introspection: true,
      typeDefs: schema,
      resolvers,
      context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || "";
        let isTokenInvalid = false;


        let decoded: any = null;

        // Check just if authorization is present
        if (token) {
          // Before to check token's validation, gateway need to check that token is not on the blacklist (it means token was reovked)
          const data = await redis.get("blacklist");
          if (data !== null) {
            const parsedData = JSON.parse(data);

            if (parsedData["token"].includes(token)) {
              isTokenInvalid = true;
            }
          } else if (isTokenInvalid === false) {
            decoded = verify(token);
          }
        }


        return { user: decoded && decoded.user ? decoded.user : null };
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
        if (error.originalError instanceof AuthenticationError) {
          console.error(error);
          return new GraphQLError("Not allowed to perform this operation");
        }
        console.error(error);
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
