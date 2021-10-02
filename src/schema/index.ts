import userSchema from "./user.schema";
import eventSchema from "./event.schema";
import { gql } from "apollo-server-express";

const baseSchema = gql`
  type Query {
    users: [User]
    login(email: String, password: String): User
    eventsUser(id: String) : [EventsUser]


  }

  type Mutation {
    signin(email:String, password:String) : User
    signout : String
  }
`;
export default [baseSchema, userSchema,eventSchema];
