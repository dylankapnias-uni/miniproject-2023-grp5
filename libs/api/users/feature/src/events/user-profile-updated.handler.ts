import { UserProfileRepository } from '@mp/api/users/data-access';
import { UserProfileUpdatedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserProfileUpdatedEvent)
export class UserProfileUpdatedHandler
  implements IEventHandler<UserProfileUpdatedEvent>
{
  constructor(private readonly repository: UserProfileRepository) {}

  async handle(event: UserProfileUpdatedEvent) {
    console.log(`${UserProfileUpdatedHandler.name}`);
    await this.repository.updateUserProfile(event.request.userProfile);
  }
}
