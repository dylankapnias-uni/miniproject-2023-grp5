import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { FetchNotificationsQuery } from '@mp/api/notifications/util';

@QueryHandler(FetchNotificationsQuery)
export class FetchNotificationsHandler implements IQueryHandler<FetchNotificationsQuery> {
  constructor(private readonly repository: NotificationRepository) {}

  async execute(query: FetchNotificationsQuery) {
    console.log(`${FetchNotificationsHandler.name}`);
    return this.repository.getNotifications(query.request.userId);
  }
}