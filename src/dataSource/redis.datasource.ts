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
   * @description Save user's JWT token and relative mail of users.
   * @returns
   */
  async saveToken(username: string, token:string) {
    const body = {
      username,
      token
    }
    return await this.redisClient.set(token,JSON.stringify(body),"EX",60*30); // 30 mins
  }


  /**
   * 
   */

  async getToken(token:string) {
      return await this.redisClient.get(token);
  }


  async deleteTokenFromCache (token:string) {
    return await this.redisClient.del(token);
  }
}

export default RedisDataSource;
