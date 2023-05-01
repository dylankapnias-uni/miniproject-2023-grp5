import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { ClearNotificationsCommand, IClearNotificationsResponse
} from '@mp/api/notifications/util';

import { Notification } from '../models';

@CommandHandler(ClearNotificationsCommand)
export class ClearNotificationsHandler
implements ICommandHandler<ClearNotificationsCommand, IClearNotificationsResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository: NotificationRepository) {}
    async execute(command: ClearNotificationsCommand) {
        console.log(`${ClearNotificationsHandler.name}`);
    
         const request = command.request;
         const userId = request.userId;
         const data =  {userId:userId, inbox:[]};
         if (!data) throw new Error('Profile not found');
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
         notification.clearNotifications(userId);
         notification.commit();
         const resp: IClearNotificationsResponse ={notification:notification};
        return resp;
      }
}