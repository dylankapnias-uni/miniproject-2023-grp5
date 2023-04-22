import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import {
    SendNotificationCommand,
    INotification,
    IInbox,
    ISendNotificationRequest,
    ISendNotificationResponse,
} from '@mp/api/notifications/util';

import { Notification } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
implements ICommandHandler<SendNotificationCommand,ISendNotificationResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository: NotificationRepository) {}
    async execute(command: SendNotificationCommand) {
        console.log(`${SendNotificationHandler.name}`);
         const request = command.request;
         const userId = request.userId;
         const notifDoc = await this.repository.getNotifications(userId);
         const data =  {userId:userId, inbox:notifDoc.data()?.inbox};
         console.log(data);
         if (!data) throw new Error('Profile not found');
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
         notification.sendNotification(request.inbox);
         notification.commit();
         const resp: ISendNotificationResponse ={notification:notification};
        //  const resp: ISendNotificationResponse = {notification:{userId:'5',inbox:[{sender:'3',recipient:'6',content:'test',time:Timestamp.fromDate(new Date())}]}};
         return resp;
      }
}