import { UserAcceptedEvent } from '@mp/api/home/util';
import { HomeRepository } from '@mp/api/home/data-access';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserAcceptedEvent)
export class UserAcceptedHandler
  implements IEventHandler<UserAcceptedEvent>
{
  constructor(private readonly repository: HomeRepository) {}

  async handle(event: UserAcceptedEvent) {
    console.log(`${UserAcceptedHandler.name}`);

    await this.repository.acceptUser(event.home.userId,event.home.userRef.accepted[event.home.userRef.accepted.length-1]);
  }
}
