import { AuthenticationError } from "apollo-server-errors";
import { GraphQLError } from "graphql";
import { AddEvent, ScanEvent } from "../../src/interfaces/events";

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

    userEventList: async (
      parent: any,
      { userId }: any,
      { dataSources, user }: any
    ) => {
      if (user) {
        const response = await dataSources.eventsAPI.getEventsUserList(userId);
        return dataSources.eventsAPI.eventsUserListReducer(response.data);
      }

      throw new AuthenticationError("You need to be logged in");
    },

    scanEvent: async (
      parent: any,
      body: ScanEvent,
      { dataSources, user }: any
    ) => {
      if (!user) {
        const response = await dataSources.eventsAPI.scanEvent(body);


        if (response.status === 400) {
          console.log("response.status",response.status);

          throw new GraphQLError(response.data);
        }

        return response;
      }

      throw new AuthenticationError("You need to be logged in");
    },
  },
  Mutation: {
    addEvent: async (
      parent: any,
      body: { params: AddEvent },
      { dataSources, user }: any
    ) => {
      try {
        if (user) {
          const response = await dataSources.eventsAPI.addEventOnList(
            body.params
          );

          return response.data;
        } else {
          throw new AuthenticationError("You need to be logged in");
        }
      } catch (error) {
        console.error(error);
        return error.message;
      }
    },

    addEventOnUserList: async (
      parent: any,
      body: any,
      { dataSources, user }: any
    ) => {
      try {
        if (!user) {
          const response = await dataSources.eventsAPI.addEventOnUserList(
            body.params.userId,
            body.params.eventId
          );
          return response.data;
        }

        throw new AuthenticationError("You need to be logged in");
      } catch (error) {
        console.error(error);
        return error.message;
      }
    },
  },
};
