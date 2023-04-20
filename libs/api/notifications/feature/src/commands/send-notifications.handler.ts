import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import {
    SendNotificationCommand,
    INotification,
    IInbox,
} from '@mp/api/notifications/util';

import { Notification } from '../models';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
implements ICommandHandler<SendNotificationCommand>
{
    constructor(private publisher: EventPublisher, private readonly repository: NotificationRepository) {}
    async execute(command: SendNotificationCommand) {
        console.log(`${SendNotificationHandler.name}`);
    
         const request = command.request;
         const userId = request.userId;

         const inbox=request.inbox;
         const notifDoc = await this.repository.getNotifications(userId);
         const data =  notifDoc.data();
         if (!data) throw new Error('Profile not found');
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
         notification.sendNotification(request.inbox);
        notification.commit();
      }
}