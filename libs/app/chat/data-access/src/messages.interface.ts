import { Timestamp } from "firebase-admin/firestore";

export interface IMessages{
    message: string | null | undefined;
    time : Date;
    userID : string;
}