import { SettingsRepository } from '@mp/api/settings/data-access';
import { TimeSubtractedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(TimeSubtractedEvent)
export class TimeSubtractedHandler
  implements IEventHandler<TimeSubtractedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: TimeSubtractedEvent) {
    console.log(`${TimeSubtractedHandler.name}`);
    await this.repository.subtractTime(event.userId, event.data);
  }
}
