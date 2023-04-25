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
    if(!event.notification.inbox) return;
    await this.repository.deleteNotification(event.notification.userId, event.notification.inbox); //clears notifications in inbox to API
  }
}
