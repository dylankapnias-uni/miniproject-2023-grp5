import { NotificationsSagas } from './notifications.sagas';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClearNotificationsHandler, CreateNotificationHandler, DeleteNotificationHandler, SendNotificationHandler } from './commands';
import { NotificationService } from './notifications.service';
import { NotificationModule as NotificationDataAccessModule } from '@mp/api/notifications/data-access';
import { NotificationCreatedHandler, NotificationDeleteHandler, NotificationSentHandler, NotificationsClearedHandler } from './events';
import { FetchNotificationsHandler } from './queries';
export const CommandHandlers = [DeleteNotificationHandler,SendNotificationHandler, CreateNotificationHandler, ClearNotificationsHandler];
export const EventHandlers = [NotificationDeleteHandler,NotificationSentHandler, NotificationCreatedHandler, NotificationsClearedHandler];
export const QueryHandlers = [FetchNotificationsHandler];
@Module({
  imports: [CqrsModule, NotificationDataAccessModule],
  providers: [
    NotificationService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    NotificationsSagas
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
