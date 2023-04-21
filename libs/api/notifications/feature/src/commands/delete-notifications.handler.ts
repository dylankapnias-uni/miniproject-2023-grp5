import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import {
    INotification,
    IInbox,
    DeleteNotificationCommand,
} from '@mp/api/notifications/util';

import { Notification } from '../models';

@CommandHandler(DeleteNotificationCommand)
export class DeleteNotificationHandler
implements ICommandHandler<DeleteNotificationCommand>
{
    constructor(private publisher: EventPublisher, private readonly repository: NotificationRepository) {}
    async execute(command: DeleteNotificationCommand) {
        console.log(`${DeleteNotificationHandler.name}`);
    
         const request = command.request;
         const userId = request.userId;
         const notifDoc = await this.repository.getNotifications(userId);
         const data =  notifDoc.data();
         if (!data) throw new Error('Profile not found');
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
         notification.deleteNotification(userId);
         notification.commit();
      }
}