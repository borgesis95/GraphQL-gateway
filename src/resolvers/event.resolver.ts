import { AuthenticationError } from "apollo-server-errors";
import { GraphQLError } from "graphql";
import { AddEvent, ScanEvent } from "../../src/interfaces/events";

export default {
  Query: {
    /*
      Allow to retrieve all users events
    */
    events: async (parent: any, _: any, { dataSources, user }: any) => {
      if (user) {
        const response = await dataSources.eventsAPI.getAllEvent();
        return dataSources.eventsAPI.eventsReducer(response.data);
      }

      throw new AuthenticationError("You need to be logged in");
    },

    /**
     * Allow user to get all its events
     * @param parent
     * @param param1
     * @param param2
     * @returns
     */
    userEventList: async (parent: any, _: any, { dataSources, user }: any) => {
      if (user) {
        const response = await dataSources.eventsAPI.getEventsUserList(
          user._id
        );
        return dataSources.eventsAPI.eventsUserListReducer(response.data);
      }

      throw new AuthenticationError("You need to be logged in");
    },

    scanEvent: async (
      parent: any,
      body: ScanEvent,
      { dataSources, user }: any
    ) => {
      if (user) {
        const response = await dataSources.eventsAPI.scanEvent(body);

        if (response.status === 400) {
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
        if (user) {
          const response = await dataSources.eventsAPI.addEventOnUserList(
            user._id,
            body.params.eventId
          );

          if (response.status === 400) {
            throw new GraphQLError(response.data);
          }
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
