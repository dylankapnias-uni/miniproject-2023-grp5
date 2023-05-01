import { SettingsRepository } from '@mp/api/settings/data-access';
import { TimeAddedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(TimeAddedEvent)
export class TimeAddedHandler
  implements IEventHandler<TimeAddedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: TimeAddedEvent) {
    console.log(`${TimeAddedHandler.name}`);
    await this.repository.addTime(event.userId, event.data);
  }
}
