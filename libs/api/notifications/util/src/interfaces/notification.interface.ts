import { IInbox } from "./inbox.interface";

export interface INotification {
    userId:string;
    inbox : IInbox[] | null | undefined;    
}