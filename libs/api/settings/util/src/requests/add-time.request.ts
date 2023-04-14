import { Timestamp } from "firebase-admin/firestore"

export interface IAddTimeRequest {
  userId: string,
  purchase: {
    date: Timestamp,
    amount: number
  }
}