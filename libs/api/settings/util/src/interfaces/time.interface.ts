import { Timestamp } from "firebase-admin/firestore";

export interface ITime {
  remaining: number,
  history?: { time: Timestamp, amount: number }[];
}