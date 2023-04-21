import { SettingsRepository } from '@mp/api/settings/data-access';
import { UserBlockedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserBlockedEvent)
export class UserBlockedHandler
  implements IEventHandler<UserBlockedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: UserBlockedEvent) {
    console.log(`${UserBlockedHandler.name}`);
    await this.repository.blockUser(event.request.userId, event.request.blockedUserId);
  }
}
