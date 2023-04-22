import { IInbox, INotification } from '../interfaces';

export interface ISendNotificationRequest {
  userId: string;
  inbox: IInbox;
}
