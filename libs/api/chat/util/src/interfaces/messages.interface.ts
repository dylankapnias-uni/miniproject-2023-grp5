import { Timestamp } from "firebase-admin/firestore";

export interface IMessages{
    message: string | null | undefined;
    time : Timestamp;
    userID : string;
    username: string;
}