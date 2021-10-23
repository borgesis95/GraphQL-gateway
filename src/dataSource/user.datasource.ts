import { RESTDataSource } from "apollo-datasource-rest";
import { UserRequest } from "../interfaces/user.interface";

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

  async signinUser(body: UserRequest) {
    return this.post("signin", body);
  }

  /*Reducers*/
  loginUserReducer(email: string, token: string) {
    return {
      email,
      token,
    };
  }

  signInReducer(user:any) {
    return {
        id : user._id,
        email : user.email
    }
  }



}

export default UserAPI;
