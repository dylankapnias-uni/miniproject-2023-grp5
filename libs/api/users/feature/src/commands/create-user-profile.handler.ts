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
      age : 0, // Way too young to be using a dating app || Bruh so truu
      bio: null, // I don't exist
      dob: dob, // I was born today
      gender: null, // I am fluid, I flow like the water - Bruce Lee (Lee Jun-fan)
      interests: [], // Boring as fuck
      posts: [], // Fucking cats probably || Nah, just a lurker
      sexuality: null, // Huh, are you even attractive || Don't even talk to me if you aren't 9"7
      time: 7200 // Free money, lesgoo
    };
    const user = this.publisher.mergeObjectContext(UserProfile.fromData(data));

    user.create();
    user.commit();

    return {user: data};
  }
}
