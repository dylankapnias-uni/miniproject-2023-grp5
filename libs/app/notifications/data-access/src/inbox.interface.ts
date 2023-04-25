import { Timestamp } from "firebase-admin/firestore";

export interface IInbox{
    content: string; 
    recipient : string;
    sender : string;
    time : Timestamp;
}