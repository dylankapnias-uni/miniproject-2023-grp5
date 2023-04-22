import { NotificationRepository } from '@mp/api/notifications/data-access';
import {  NotificationsClearedEvent } from '@mp/api/notifications/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(NotificationsClearedEvent)
export class NotificationsClearedHandler
  implements IEventHandler<NotificationsClearedEvent>
{
  constructor(private readonly repository: NotificationRepository) {}

  async handle(event: NotificationsClearedEvent) {
    console.log(`${NotificationsClearedHandler.name}`);
    console.log(JSON.stringify(event.notification));
    if(!event.notification.inbox) return;
    await this.repository.clearAllNotifications(event.notification.userId); //sends last notification in inbox to API
  }
}
