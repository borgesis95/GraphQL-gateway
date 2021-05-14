export default {
  Query: {
    users: async (parent:any, { id} :any , { dataSources }:any) => {
      const response = await dataSources.usersAPI.getAllUsers();
      return response.data;
    },
  },
};
