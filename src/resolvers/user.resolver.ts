import { AuthenticationError } from "apollo-server-errors";
import { UserRequest } from "../interfaces/user.interface";

export default {
  Query: {
    users: async (parent: any, _: any, { dataSources, user }: any) => {

      // If users exist on Redis
      if (user) {
        const response = await dataSources.usersAPI.getAllUsers();
        return dataSources.usersAPI.usersReducer(response.data);
      }
      throw new AuthenticationError("You need to be logged in");
    },

    // Login Query
    login: async (
      parent: any,
      { email, password }: UserRequest,
      { dataSources }: any
    ) => {
      const response = await dataSources.usersAPI.loginUser({
        email,
        password,
      });


      const token: string = response.data.token;
      // Now, JWT will be saved into redis store.
      await dataSources.redisSource.saveToken(email, token);
      return dataSources.usersAPI.loginUserReducer(email, token);
    },
  },

  Mutation: {
    // Signin Mutation
    signin: async (
      parent: any,
      { email, password }: UserRequest,
      { dataSources }: any
    ) => {
      const response = await dataSources.usersAPI.signinUser({
        email,
        password,
      });

      return dataSources.usersAPI.signinReducer(response.data);
    },

    signout: async (parent: any, item: any, { dataSources, user }: any) => {
      if (user && user.token) {
        // Redis Response for "DEL" operation is numbers of keys removed (it should be just one)
        const response = await dataSources.redisSource.deleteTokenFromCache(
          user.token
        );

        if (response === 1)
          return ` Signout for ${user.username} has been successful`;
      } else {
        throw new AuthenticationError("You need to be logged in");
      }
    },
  },
};
