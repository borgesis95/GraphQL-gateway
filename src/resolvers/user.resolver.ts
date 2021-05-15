import { UserRequest } from "../interfaces/user.interface";

export default {
  Query: {
    users: async (parent: any, { id }: any, { dataSources }: any) => {
      const response = await dataSources.usersAPI.getAllUsers();
      return response.data;
    },
  },

  Mutation: {
    // Login Mutation
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
      return dataSources.usersAPI.loginUserReducer(email, token);
    },
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
  },
};
