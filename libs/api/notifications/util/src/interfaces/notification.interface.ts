import { IInbox } from "./inbox.interface";

export interface INotification {
    inbox : IInbox[] | null | undefined;    
}