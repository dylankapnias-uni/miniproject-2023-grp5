
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AcceptUserCommand, IHome } from '@mp/api/home/util';
import { Home } from '../models';

@CommandHandler(AcceptUserCommand)
export class AcceptUserHandler
  implements ICommandHandler<AcceptUserCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: AcceptUserCommand) {
    console.log(`${AcceptUserHandler.name}`);

    const request = command.request;
    const userId = request.userId;
    const userMatch = request.userMatch;

    const data = {userId:userId,userList:[userMatch]} as IHome;

    const profile = this.publisher.mergeObjectContext(Home.fromData(data));

    profile.acceptUser();
    profile.commit();
  }
}
