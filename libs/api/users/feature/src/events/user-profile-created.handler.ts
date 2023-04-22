import { UserProfileRepository } from '@mp/api/users/data-access';
import { UserCreatedEvent } from '@mp/api/users/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly repository: UserProfileRepository) {}

  async handle(event: UserCreatedEvent) {
    console.log(`${UserCreatedHandler.name}`);
    await this.repository.createUserProfile(event.user);
  }
}
