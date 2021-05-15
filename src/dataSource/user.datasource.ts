import { RESTDataSource } from "apollo-datasource-rest";
import { UserLoginRequest } from "../interfaces/user.interface";

class UserAPI extends RESTDataSource {
  constructor() {
    super();

    // This has to be moved into ENV file
    this.baseURL = "http://localhost:5000/auth";
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
  async loginUser(body: UserLoginRequest) {
    return this.post("login", body);
  }

  /*Reducers*/

  async loginUserReducer(email: string, token: string) {
    return {
      email,
      token,
    };
  }
}

export default UserAPI;
