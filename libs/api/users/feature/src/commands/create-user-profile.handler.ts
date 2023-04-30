import { CreateUserCommand, IUserProfile } from '@mp/api/users/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserProfile } from '../models';
import { Timestamp } from 'firebase-admin/firestore';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateUserCommand) {
    console.log(`${CreateUserHandler.name}`);
    const dob = Timestamp.fromDate(new Date());
    const request = command.request;
    const data: IUserProfile = {
      userId: request.auth.id,
      email: request.auth.email,
      name: request.auth.displayName,
      profilePicture: request.auth.photoURL,
      phoneNumber: request.auth.phoneNumber,
      customClaims: request.auth.customClaims,
      created: request.auth.created,
      age : 0, // way too young to be using a dating app
      bio: null,
      dob: dob,
      gender: null,
      interests: [],
      posts: [],
      sexuality: null,
      time: 7200
    };
    const user = this.publisher.mergeObjectContext(UserProfile.fromData(data));

    user.create();
    user.commit();

    return {user: data};
  }
}
