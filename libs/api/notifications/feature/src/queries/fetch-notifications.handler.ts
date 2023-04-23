import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotificationRepository } from '@mp/api/notifications/data-access';
import { FetchNotificationsQuery, IFetchNotificationsResponse } from '@mp/api/notifications/util';

@QueryHandler(FetchNotificationsQuery)
export class FetchNotificationsHandler implements IQueryHandler<FetchNotificationsQuery, IFetchNotificationsResponse> {
  constructor(private readonly repository: NotificationRepository) {}

  async execute(query: FetchNotificationsQuery) {
    console.log(`${FetchNotificationsHandler.name}`);
    const request = query.request;
    const userId = request.userId;
    const data = await this.repository.getNotifications(query.request.userId);
    if (!data) throw new Error('Profile not found');
    const response : IFetchNotificationsResponse= {
      notification:data
    }
    
    return (response);
  }
}