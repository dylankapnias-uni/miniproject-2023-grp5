import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { FetchNotificationsQuery, INotification } from '@mp/api/notifications/util';

@QueryHandler(FetchNotificationsQuery)
export class FetchNotificationsHandler implements IQueryHandler<FetchNotificationsQuery> {
  constructor(private readonly repository: NotificationRepository) {}

  async execute(query: FetchNotificationsQuery) {
    console.log(`${FetchNotificationsHandler.name}`);

    const request = query.request;
    const response =  await this.repository.getNotifications(request.userId);

    if(response == undefined) throw new Error('Notifications not found');

    return {notifications: response};
  }
}