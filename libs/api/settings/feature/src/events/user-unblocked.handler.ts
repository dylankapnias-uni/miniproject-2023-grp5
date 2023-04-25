import { SettingsRepository } from '@mp/api/settings/data-access';
import { UserUnblockedEvent } from '@mp/api/settings/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserUnblockedEvent)
export class UserUnblockedHandler
  implements IEventHandler<UserUnblockedEvent>
{
  constructor(private readonly repository: SettingsRepository) {}

  async handle(event: UserUnblockedEvent) {
    console.log(`${UserUnblockedHandler.name}`);
    await this.repository.unblockUser(event.request.userId, event.request.blockedUserId);
  }
}
