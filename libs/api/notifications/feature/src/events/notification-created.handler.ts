import { NotificationRepository } from '@mp/api/notifications/data-access';
import { NotificationCreatedEvent, NotificationDeletedEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(NotificationCreatedEvent)
export class NotificationCreatedHandler
  implements IEventHandler<NotificationCreatedEvent>
{
  constructor(private readonly repository: NotificationRepository) {}

  async handle(event: NotificationCreatedEvent) {
    console.log(`${NotificationCreatedHandler.name}`);
    await this.repository.createNotification(event.notification.userId); //clears notifications in inbox to API
  }
}
