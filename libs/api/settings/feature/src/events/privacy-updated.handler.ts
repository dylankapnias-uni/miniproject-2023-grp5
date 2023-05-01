import { SettingsRepository } from '@mp/api/settings/data-access';
import { PrivacyUpdatedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PrivacyUpdatedEvent)
export class PrivacyUpdatedHandler
  implements IEventHandler<PrivacyUpdatedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: PrivacyUpdatedEvent) {
    console.log(`${PrivacyUpdatedHandler.name}`);
    await this.repository.updatePrivacy(event.request.userId, event.request.profileVisibility);
  }
}
