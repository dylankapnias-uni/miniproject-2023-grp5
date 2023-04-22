import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateNotificationHandler, DeleteNotificationHandler, SendNotificationHandler } from './commands';
import { NotificationService } from './notifications.service';
import { NotificationModule as NotificationDataAccessModule } from '@mp/api/notifications/data-access';
import { NotificationCreatedHandler, NotificationDeleteHandler, NotificationSentHandler } from './events';

export const CommandHandlers = [DeleteNotificationHandler,SendNotificationHandler, CreateNotificationHandler];
export const EventHandlers = [NotificationDeleteHandler,NotificationSentHandler, NotificationCreatedHandler];

@Module({
  imports: [CqrsModule, NotificationDataAccessModule],
  providers: [
    NotificationService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
