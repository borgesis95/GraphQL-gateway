import { RESTDataSource } from "apollo-datasource-rest";

class EventAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5000/events";
  }

  /**
   * @description Get events associated to specific users
   */

  async getEventListFromUser(userId: number) {
    return this.get(`basket/${userId}`);
  }

  /*Reducers*/
  eventsReducer(data: any) {
    return data.map((item: any) => {
      return {
        id: item.id,
        title: item.titolo,
      };
    });
  }
}

export default EventAPI;
