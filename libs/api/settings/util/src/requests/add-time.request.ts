import { Timestamp } from "firebase-admin/firestore"

export interface IAddTimeRequest {
  userId: string,
  purchaseAmount: number
  
}