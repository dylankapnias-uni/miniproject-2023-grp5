import { Timestamp } from "firebase-admin/firestore";

export class TimeAddedEvent {
  constructor(
    public readonly userId: string, 
    public readonly data: {amount: number, date: Timestamp}
  ) {}
}