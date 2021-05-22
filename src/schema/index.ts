import userSchema from "./user.schema";
import { gql } from "apollo-server-express";

const baseSchema = gql`
  type Query {
    users: [User]
    login(email: String, password: String): User


  }

  type Mutation {
    signin(email:String, password:String) : User
    signout : String
  }
`;
export default [baseSchema, userSchema];
