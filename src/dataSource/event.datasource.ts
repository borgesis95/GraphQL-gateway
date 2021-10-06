import { RESTDataSource } from "apollo-datasource-rest";
import { AddEvent } from "../../src/interfaces/events";

class EventAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5000/events";
  }

  /**
   * @description Get events associated to specific users
   */

  getEventListFromUser(userId: number) {
    return this.get(`basket/${userId}`);
  }

  /**
   * This method will be call API that allow to insert
   * an events on events list (which each user could decide to partecipate)
   */
  async addEventOnList(body: AddEvent): Promise<string> {
    const bodyForRequest = {
      titolo: body.title,
      descrizione: body.description,
      dataEvento: body.eventDate,
      durata: body.duration,
      idOrganizzatore: body.handlerId,
      greenPass: true,
      numeroMaxPartecipanti: body.maxPartecipant,
      citta: body.city,
      //TODO: This need to be changed into service event-service
      numeroPartecipanti: 0,
    };
    return this.post(`add`, bodyForRequest);
  }

  getEventsUserList(userId: number) {
    return this.get(`/basket/${userId}`);
  }

  addEventOnUserList(userId: number, eventId: number) {
    const body = {
      idEvento: eventId,
      idUtente: userId,
    };
    return this.post(`/basket`, body);
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

  eventsUserListReducer(data: any) {
    return data.map((item: any) => {
      return {
        id: item.id,
        accessKey: item.chiaveDiAccesso,
        title: item.titolo,
        description: item.descrizione,
        dataevento: item.dataevento,
        durata: item.durata,
      };
    });
  }
}

export default EventAPI;
