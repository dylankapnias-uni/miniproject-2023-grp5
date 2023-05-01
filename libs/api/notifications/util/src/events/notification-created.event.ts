import { INotification } from "../interfaces";

export class NotificationCreatedEvent {
  constructor(public readonly notification:INotification){}
}