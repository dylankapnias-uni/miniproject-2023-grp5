import { UserProfileRepository } from '@mp/api/users/data-access';
import { UserProfileDeletedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserProfileDeletedEvent)
export class UserProfileDeletedHandler
  implements IEventHandler<UserProfileDeletedEvent>
{
  constructor(private readonly repository: UserProfileRepository) {}

  async handle(event: UserProfileDeletedEvent) {
    console.log(`${UserProfileDeletedHandler.name}`);
    await this.repository.deleteUserProfile(event.request.userId);
  }
}
