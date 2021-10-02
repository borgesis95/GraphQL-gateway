import { AuthenticationError } from "apollo-server-errors";

export default {
  Query: {
    eventsUser: async (parent: any, { id }: any, { dataSources }: any) => {
      const response = await dataSources.eventsAPI.getEventListFromUser(id);
      return dataSources.eventsAPI.eventsReducer(response.data);
    },
  },
};
