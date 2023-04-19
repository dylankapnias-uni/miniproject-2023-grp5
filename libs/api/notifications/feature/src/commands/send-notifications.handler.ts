import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import {
    SendNotificationCommand,
    INotification,
    IInbox,
} from '@mp/api/notifications/util';

import { Notification } from '../models';

@CommandHandler(SendNotificationCommand)
export class CreateNotificationHandler
implements ICommandHandler<SendNotificationCommand>
{
    constructor(private publisher: EventPublisher) {}
    async execute(command: SendNotificationCommand) {
        console.log(`${CreateNotificationHandler.name}`);
    
         const request = command.request;
         const userId = request.userId;

         const inbox=request.inbox;

        //   userId,
        //   accountDetails: {
        //     displayName,
        //     email,
        //     photoURL,
        //     status: ProfileStatus.INCOMPLETE,
        //   },
        //   personalDetails: {
        //     age: null,
        //     gender: null,
        //     ethnicity: null,
        //     status: ProfileStatus.INCOMPLETE,
        //   },
        //   contactDetails: {
        //     cellphone,
        //     status: ProfileStatus.INCOMPLETE,
        //   },
        //   addressDetails: {
        //     residentialArea: null,
        //     workArea: null,
        //     status: ProfileStatus.INCOMPLETE,
        //   },
        //   occupationDetails: {
        //     householdIncome: null,
        //     occupation: null,
        //     status: ProfileStatus.INCOMPLETE,
        //   },
        //   status: ProfileStatus.INCOMPLETE,
        //   created: Timestamp.fromDate(new Date()),
        // };
         const notification = this.publisher.mergeObjectContext(Notification.fromData(data));
    
         notification.create();
        notification.commit();
      }
}