import { INotification } from '../interfaces';

export class NotificationSentEvent {
  constructor(public readonly notification: INotification) {}
}
