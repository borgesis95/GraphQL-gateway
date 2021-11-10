import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { UserRequest } from "../interfaces/user.interface";
import { IUser } from "../types";

class UserAPI extends RESTDataSource {
  constructor() {
    super();

    // This has to be moved into ENV file
    this.baseURL = `http://${process.env.AUTH_SERVICE_URL}:${process.env.AUTH_SERVICE_PORT}/auth`;
  }

  /**
   * @description Get users
   * @returns
   */
  async getAllUsers() {
    return this.get("users");
  }

  /**
   * @ call Login API of user service
   * @param body
   */
  async loginUser(body: UserRequest) {
    return this.post("login", body);
  }

  /**
   * This api allow user to signin into the application
   * @param body
   * @returns
   */

  async signinUser(body: UserRequest) {
    return this.post("signin", body);
  }

  logoutUser(token: string) {
    return this.post("logout", { token });
  }

  /*Reducers*/
  loginUserReducer(email: string, token: string) {
    return {
      email,
      token,
    };
  }

  usersReducer = (users: IUser[]) => {
    return users.map((user: IUser) => {
      return {
        id: user._id,
        email: user.email,
      };
    });
  };

  signInReducer(user: IUser) {
    return {
      id: user._id,
      email: user.email,
    };
  }
}

export default UserAPI;
