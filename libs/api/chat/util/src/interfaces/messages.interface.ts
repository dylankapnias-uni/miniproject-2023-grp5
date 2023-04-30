// import { Timestamp } from "firebase-admin/firestore";
import { Timestamp } from 'firebase/firestore';

export interface IMessages{
    message: string | null | undefined;
    time : Timestamp;
    userId : string;
    
}