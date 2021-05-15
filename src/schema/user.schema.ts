import {gql} from 'apollo-server-express';

export default gql`
  type User {
    id: ID
    """ users email """
    email: String,

    """ this is the JWT getting back for login operation """
    token : String
  }
  `