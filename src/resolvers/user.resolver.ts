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

    signout: async (
      parent: any,
      { token }: any,
      { dataSources, user }: any
    ) => {
      const response = await dataSources.usersAPI.logoutUser(token);
      if (response) return ` Signout has been successful`;
    },
  },
};
