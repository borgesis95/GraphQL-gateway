
export interface IEvent {
    id : number;
    titolo : string;
    descrizione : string;
    dataEvento : string;
    citta: string;
    chiaveDiAccesso? : string;
    durata? : string;
}

export interface IUser {
    _id : string;
    email: string;
}