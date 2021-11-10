import { gql } from "apollo-server-express";

export default gql`

  type Events {
    id : ID,
    accessKey : String,
    title : String,
    description : String,
    eventDate : String,
    duration : Int,
    city: String
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

  input AddEventUserList {
    eventId : String,
  }
`;
