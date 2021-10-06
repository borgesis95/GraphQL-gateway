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

  input AddEvent {
    """
    Title of event 
    """
    title : String,
    description : String,
    eventDate : String,
    duration : String,
    handlerId : Int,
    greenpass : Boolean,
    maxPartecipant : Int,
    city : String
  }
`;
