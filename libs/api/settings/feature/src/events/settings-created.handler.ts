import { SettingsRepository } from '@mp/api/settings/data-access';
import { SettingsCreatedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
@EventsHandler(SettingsCreatedEvent)
export class SettingsCreatedHandler
  implements IEventHandler<SettingsCreatedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: SettingsCreatedEvent) {
    console.log(`${SettingsCreatedHandler.name}`);
    await this.repository.createSettings(event.settings);
    await this.repository.addTime(event.settings.userId, {amount: 10000, date: Timestamp.fromDate(new Date())});
  }
}
