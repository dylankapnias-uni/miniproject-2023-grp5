import { INotification } from '../interfaces';

export class NotificationDeletedEvent {
  constructor(public readonly notification: INotification) {}
}
