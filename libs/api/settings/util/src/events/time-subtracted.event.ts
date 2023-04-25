import { Timestamp } from "firebase-admin/firestore";
import { ISubtractTimeRequest } from "../requests";

export class TimeSubtractedEvent {
  constructor(
    public readonly userId: string, 
    public readonly data: {amount: number, date: Timestamp}
  ){}
}