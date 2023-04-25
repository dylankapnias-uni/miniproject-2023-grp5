
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RejectUserCommand, IRejectUserResponse, IParsingData, IUserRef } from '@mp/api/home/util';
import { Home } from '../models';
import { HomeRepository } from '@mp/api/home/data-access';

@CommandHandler(RejectUserCommand)
export class RejectUserHandler
  implements ICommandHandler<RejectUserCommand, IRejectUserResponse>
{
  constructor(private publisher: EventPublisher, private readonly repository:HomeRepository) {}

  async execute(command: RejectUserCommand) {
    console.log(`${RejectUserHandler.name}`);

    const request = command.request;
    const userId = request.userId;

    const rejectedUserId = request.rejectedUserId;

    
    if(!rejectedUserId) throw new Error('User ID is null');
    const resp = await this.repository.getHomeValuesForUser(userId) as IUserRef;
    const data: IParsingData={userId:userId, userRef:resp};
    const home = this.publisher.mergeObjectContext(Home.fromData(data));

    home.rejectUser(rejectedUserId);
    home.commit();

    const response: IRejectUserResponse ={home:home} as IRejectUserResponse;
    
    return response;
  }
}
