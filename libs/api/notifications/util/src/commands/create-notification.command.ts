import { ICreateNotificationRequest } from "../requests";

export class CreateNotificationCommand {
  constructor(public readonly request: ICreateNotificationRequest){}
}
