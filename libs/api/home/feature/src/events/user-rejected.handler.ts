import { UserRejectedEvent } from '@mp/api/home/util';
import { HomeRepository } from '@mp/api/home/data-access';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserRejectedEvent)
export class UserRejectedHandler
  implements IEventHandler<UserRejectedEvent>
{
  constructor(private readonly repository: HomeRepository) {}

  async handle(event: UserRejectedEvent) {
    console.log(`${UserRejectedHandler.name}`);

    await this.repository.rejectUser(event.home.userId, event.rejectedUser);
  }
}
