
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Home } from '../models';
import { AcceptUserCommand } from '@mp/api/home/util';

@CommandHandler(AcceptUserCommand)
export class AcceptUserHandler
  implements ICommandHandler<AcceptUserCommand>
{
  constructor(private publisher: EventPublisher) {}

  async execute(command: AcceptUserCommand) {
    console.log(`${AcceptUserHandler.name}`);

    const request = command.request;
    

    const profile = this.publisher.mergeObjectContext(Profile.fromData(data));

    profile.create();
    profile.commit();
  }
}
