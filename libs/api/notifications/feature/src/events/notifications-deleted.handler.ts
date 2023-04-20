import { NotificationRepository } from '@mp/api/notifications/data-access';
import { NotificationDeletedEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(NotificationDeletedEvent)
export class NotificationDeleteHandler
  implements IEventHandler<NotificationDeletedEvent>
{
  constructor(private readonly repository: NotificationRepository) {}

  async handle(event: NotificationDeletedEvent) {
    console.log(`${NotificationDeleteHandler.name}`);
    await this.repository.clearNotification(event.notification.userId); //clears notifications in inbox to API
  }
}
