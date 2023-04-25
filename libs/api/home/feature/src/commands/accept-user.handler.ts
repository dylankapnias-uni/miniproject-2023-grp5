
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AcceptUserCommand, IAcceptUserResponse, IParsingData, IUserRef } from '@mp/api/home/util';
import { Home } from '../models';
import { HomeRepository } from '@mp/api/home/data-access';

@CommandHandler(AcceptUserCommand)
export class AcceptUserHandler
  implements ICommandHandler<AcceptUserCommand, IAcceptUserResponse>
{
  constructor(private publisher: EventPublisher, private readonly repository:HomeRepository) {}

  async execute(command: AcceptUserCommand) {
    console.log(`${AcceptUserHandler.name}`);

    const request = command.request;
    const userId = request.userId;

    const userMatch = request.userMatch;

    
    if(!userMatch.user?.userId) throw new Error('User ID is null');
    const resp = await this.repository.getHomeValuesForUser(userMatch.user?.userId) as IUserRef;
    const data: IParsingData={userId:userId, userRef:resp};
    const home = this.publisher.mergeObjectContext(Home.fromData(data));

    if (userMatch.match){
      //TODO: Create New Chat
      const response: IAcceptUserResponse ={home:home} as IAcceptUserResponse;

      return response;
    }

    home.acceptUser(userMatch);
    home.commit();

    const response: IAcceptUserResponse ={home:home} as IAcceptUserResponse;
    
    return response;
  }
}
