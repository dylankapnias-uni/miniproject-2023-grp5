import { IInbox, INotification } from '@mp/api/notifications/util';

export interface ISendNotificationRequest {
  userId: string;
  inbox: IInbox;
}
