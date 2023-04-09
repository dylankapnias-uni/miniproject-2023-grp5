import { Timestamp } from "firebase-admin/firestore";

export interface ITime {
  remaining: number,
  history?: { date: Timestamp, amount: number }[];
}