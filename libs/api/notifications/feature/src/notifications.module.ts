import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteNotificationHandler, SendNotificationHandler } from './commands';
import { NotificationService } from '@mp/api/notifications/feature';
import { NotificationModule as NotificationDataAccessModule } from '@mp/api/notifications/data-access';
import { NotificationDeleteHandler, NotificationSentHandler } from './events';

export const CommandHandlers = [DeleteNotificationHandler,SendNotificationHandler];
export const EventHandlers = [NotificationDeleteHandler,NotificationSentHandler];

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
