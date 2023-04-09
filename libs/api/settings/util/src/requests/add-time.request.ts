import { Timestamp } from "firebase-admin/firestore"

export interface IAddTimeRequest {
  userId: string,
  purchase: {
    time: Timestamp,
    amount: number
  }
}