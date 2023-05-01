import { CreateMockUserCommand, IUserProfile } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserProfile } from '../models';

@CommandHandler(CreateMockUserCommand)
export class CreateMockUserHandler implements ICommandHandler<CreateMockUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateMockUserCommand) {
    console.log(`${CreateMockUserHandler.name}`);

    const data: IUserProfile = command.user;
    const user = this.publisher.mergeObjectContext(UserProfile.fromData(data));

    user.create();
    user.commit();

    return data;
  }
}
