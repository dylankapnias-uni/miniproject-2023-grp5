import { CreateUserCommand, IUserProfile } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserProfile } from '../models';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    console.log(`${CreateUserHandler.name}`);

    const request = command.request;
    const data: IUserProfile = {
      userId: request.auth.id,
      email: request.auth.email,
      name: request.auth.displayName,
      profilePicture: request.auth.photoURL,
      phoneNumber: request.auth.phoneNumber,
      customClaims: request.auth.customClaims,
      created: request.auth.created,
      age : null,
      bio: null,
      dob: null,
      gender: null,
      interests: [],
      posts: [],
      sexuality: null,
      time: null
    };
    const user = this.publisher.mergeObjectContext(UserProfile.fromData(data));

    user.create();
    user.commit();

    return {user: data};
  }
}
