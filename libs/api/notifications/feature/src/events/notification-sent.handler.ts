import { NotificationRepository } from '@mp/api/notifications/data-access';
import { NotificationSentEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(NotificationSentEvent)
export class NotificationSentHandler
  implements IEventHandler<NotificationSentEvent>
{
  constructor(private readonly repository: NotificationRepository) {}

  async handle(event: NotificationSentEvent) {
    console.log(`${NotificationSentHandler.name}`);
    await this.repository.sendNotification(event.notification.userId, event.notification.inbox);
  }
}
