import { ISendNotificationRequest } from '../requests';

export class SendNotificationCommand {
  constructor(public readonly request: ISendNotificationRequest) {}
}
