import userSchema from "./user.schema";
import eventSchema from "./event.schema";
import { gql } from "apollo-server-express";

const baseSchema = gql`
  type Query {
    users: [User]
    login(email: String, password: String): User
    events (userId: String) : [EventsUser],
    userEventList (userId : String) : [EventsUserList]
    scanEvent (userId : String, eventId: String, accessKey : String) : String


  }

  type Mutation {
    signin(email:String, password:String) : User
    signout : String
    addEvent (params : AddEvent) : String
    addEventOnUserList (params : AddEventUserList) : String
  }
`;
export default [baseSchema, userSchema,eventSchema];
