import { RESTDataSource } from "apollo-datasource-rest";
import { AddEvent, ScanEvent } from "../../src/interfaces/events";
import { IEvent } from "../types";

class EventAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://${process.env.EVENT_SERVICE_URL}:${process.env.EVENT_SERVICE_PORT}/events`;
  }

  /**
   * @description Get events associated to specific users
   */

  async getAllEvent() {
    return this.get(`/list`);
  }

  /**
   * This method will be call API that allow to insert
   * an events on events list (which each user could decide to partecipate)
   */
  async addEventOnList(body: AddEvent) {
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

  /**
   *
   * This method allow to retrieve events for specific user
   * @param userId
   * @returns
   */
  getEventsUserList(userId: number) {
    return this.get(`/basket/${userId}`);
  }

  /**
   * This method allow user  to add an event on his list
   * @param userId
   * @param eventId
   * @returns
   */

  addEventOnUserList(userId: number, eventId: number) {
    const body = {
      idEvento: eventId,
      idUtente: userId,
    };
    return this.post(`/basket`, body);
  }

  /**
   * This method will be invoked when event's staff
   * need to check ticket of an user
   * @param body
   * @returns
   */

  scanEvent(body: ScanEvent) {
    const mappedBody = {
      idEvento: body.eventId,
      idUtente: body.userId,
      codiceAccesso: body.accessKey,
    };
    return this.post(`/basket/scan`, mappedBody);
  }

  /*Reducers*/
  eventsReducer(data: IEvent[]) {
    return data.map((item: IEvent) => {
      return {
        id: item.id,
        title: item.titolo,
        description: item.descrizione,
        date: item.dataEvento,
        city: item.citta,
      };
    });
  }

  eventsUserListReducer(data: IEvent[]) {
    return data.map((item: IEvent) => {
      return {
        id: item.id,
        accessKey: item.chiaveDiAccesso,
        title: item.titolo,
        description: item.descrizione,
        dataevento: item.dataEvento,
        durata: item.durata,
      };
    });
  }
}

export default EventAPI;
