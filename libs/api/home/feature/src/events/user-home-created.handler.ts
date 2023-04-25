import { UserHomeCreatedEvent } from '@mp/api/home/util';
import { HomeRepository } from '@mp/api/home/data-access';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserHomeCreatedEvent)
export class UserHomeCreatedHandler
  implements IEventHandler<UserHomeCreatedEvent>
{
  constructor(private readonly repository: HomeRepository) {}

  async handle(event: UserHomeCreatedEvent) {
    console.log(`${UserHomeCreatedHandler.name}`);

    await this.repository.createHome(event.home.userId);
  }
}
