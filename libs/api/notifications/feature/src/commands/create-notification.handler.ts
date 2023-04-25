import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import {
    ICreateNotificationResponse,
    CreateNotificationCommand,
} from '@mp/api/notifications/util';

import { Notification } from '../models';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
implements ICommandHandler<CreateNotificationCommand,ICreateNotificationResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository: NotificationRepository) {}
    async execute(command: CreateNotificationCommand) {
        console.log(`${CreateNotificationHandler.name}`);
         const request = command.request;
         const userId = request.userId;
         const data =  {userId:userId, inbox:[]};
         if (!data) throw new Error('Profile not found');
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
         notification.create();
         notification.commit();
         const resp: ICreateNotificationResponse ={notification:notification};
         return resp;
      }
}