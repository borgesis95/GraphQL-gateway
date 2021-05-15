import userSchema from "./user.schema";
import { gql } from "apollo-server-express";

const baseSchema = gql`
  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String, password: String): User
    signin(email:String, password:String) : User
  }
`;
export default [baseSchema, userSchema];
