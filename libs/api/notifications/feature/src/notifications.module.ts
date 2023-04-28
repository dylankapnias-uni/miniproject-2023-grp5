import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { NotificationsSagas } from './notifications.sagas';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClearNotificationsHandler, CreateNotificationHandler, DeleteNotificationHandler, SendNotificationHandler } from './commands';
import { NotificationService } from './notifications.service';
import { NotificationModule as NotificationDataAccessModule } from '@mp/api/notifications/data-access';
import { NotificationCreatedHandler, NotificationDeleteHandler, NotificationSentHandler, NotificationsClearedHandler } from './events';

export const CommandHandlers = [DeleteNotificationHandler,SendNotificationHandler, CreateNotificationHandler, ClearNotificationsHandler];
export const EventHandlers = [NotificationDeleteHandler,NotificationSentHandler, NotificationCreatedHandler, NotificationsClearedHandler];

@Module({
  imports: [CqrsModule, NotificationDataAccessModule],
  providers: [
    NotificationService,
    ...CommandHandlers,
    ...EventHandlers,
    NotificationsSagas
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
