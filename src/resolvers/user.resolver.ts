import { UserLoginRequest } from "../interfaces/user.interface";

export default {
  Query: {
    users: async (parent: any, { id }: any, { dataSources }: any) => {
      const response = await dataSources.usersAPI.getAllUsers();
      return response.data;
    },
  },

  Mutation: {
    login: async (
      parent: any,
      { email, password }: UserLoginRequest,
      { dataSources }: any
    ) => {

      const response =   await dataSources.usersAPI.loginUser({email,password});

      const token:string = response.data.token;
      return dataSources.usersAPI.loginUserReducer(email,token);
    },
  },
};
