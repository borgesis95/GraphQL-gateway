import { RESTDataSource } from "apollo-datasource-rest";
import { Redis } from "ioredis";

class RedisDataSource extends RESTDataSource  {
  redisClient: Redis;
  constructor(redisClient: Redis) {
    super();
    // This has to be moved into ENV file
    this.redisClient = redisClient;
  }

  /**
   * @description Get users
   * @returns
   */
  async saveToken() {
    console.log("Redis save token");
    return await this.redisClient.set("token","123456");
  }


  /**
   * 
   */

  async getToken() {
      console.log("get token");
      return await this.redisClient.get("token");
  }
}

export default RedisDataSource;
