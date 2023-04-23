
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AcceptUserCommand, IHome } from '@mp/api/home/util';
import { Home } from '../models';
import { HomeRepository } from '@mp/api/home/data-access';

@CommandHandler(AcceptUserCommand)
export class AcceptUserHandler
  implements ICommandHandler<AcceptUserCommand>
{
  constructor(private publisher: EventPublisher, private repository:HomeRepository) {}

  async execute(command: AcceptUserCommand) {
    console.log(`${AcceptUserHandler.name}`);

    const request = command.request;
    const userId = request.userId;

    const userMatch = request.userMatch;
    const retr = await this.repository.getSwipedForUser(userId);
    if (!retr.swiped) return;
    const sRetr = retr.swiped.toString();
    for(let i=0;i<retr.swiped.length;i++){
      if(sRetr[i] =="/User_Profile/"+(userMatch.user?.userId)){   //Good Luck ♥
        return;
      }
    }
    const data = {userId:userId,userList:[userMatch]} as IHome;

    const home = this.publisher.mergeObjectContext(Home.fromData(data));

    home.acceptUser();
    home.commit();
  }
}
