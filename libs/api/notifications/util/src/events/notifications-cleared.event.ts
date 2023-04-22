import { INotification } from '../interfaces';

export class NotificationsClearedEvent {
  constructor(public readonly notification: INotification) {}
}
