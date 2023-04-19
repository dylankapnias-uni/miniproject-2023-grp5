import { Timestamp } from "firebase-admin/firestore";

export interface IInbox{
    content: string | null | undefined; 
    recipient : string | null | undefined;
    sender : string | null | undefined;
    time : Timestamp | null | undefined;
}