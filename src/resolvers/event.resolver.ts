import { AuthenticationError } from "apollo-server-errors";
import { AddEvent } from "../../src/interfaces/events";

export default {
  Query: {
    events: async (
      parent: any,
      { userId }: any,
      { dataSources, user }: any
    ) => {
      if (!user) {
        const response = await dataSources.eventsAPI.getEventListFromUser(
          userId
        );
        return dataSources.eventsAPI.eventsReducer(response.data);
      }

      throw new AuthenticationError("You need to be logged in");
    },
  },
  Mutation: {
    addEvent: async (
      parent: any,
      body: AddEvent,
      { dataSources, user }: any
    ) => {
      try {
        const response = await dataSources.eventsAPI.addEventOnList(
          body.params
        );

        return response.data;
      } catch (error) {
        console.error(error);
        return error.message;
      }
    },
  },
};
