/**
 * Add event
 */

export interface AddEvent  {
    title : string;
    description : string;
    eventDate : string;
    duration : string;
    handlerId : number;
    greenpass: boolean;
    maxPartecipant : number;
    city : string;
}

export interface ScanEvent {
    eventId : number;
    userId : number;
    accessKey : string;
}