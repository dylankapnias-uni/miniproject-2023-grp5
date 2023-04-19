import { IInbox } from "./inbox.interface";

export interface INotification {
    userID: string,
    inbox : IInbox[];    
}