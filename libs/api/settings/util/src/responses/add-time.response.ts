import { Timestamp } from "firebase-admin/firestore";
import { ITime } from "../interfaces";
export interface IAddTimeResponse {
  userId: string,
  time: ITime
}