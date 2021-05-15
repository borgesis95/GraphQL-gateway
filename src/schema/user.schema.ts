import {gql} from 'apollo-server-express';

export default gql`
  type User {
    """ user's id """
    id: ID
    """ user email """
    email: String,

    """ this is the JWT getting back for login operation """
    token : String
  }
  `