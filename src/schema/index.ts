import userSchema from "./user";
import { gql } from "apollo-server-express";

const baseSchema = gql`
  type Query {
   users : [User]
  }
`;
export default [baseSchema, userSchema];
