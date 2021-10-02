import { gql } from "apollo-server-express";

export default gql`
  type EventsUser {
    """
    events's id
    """
    id: ID
    """
    title of the event
    """
    title: String
  }
`;
