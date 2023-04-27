
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RejectUserCommand, IRejectUserResponse, IParsingData, IUserRef, IAcceptUserResponse, IUserMatch } from '@mp/api/home/util';
import { Home } from '../models';
import { HomeRepository } from '@mp/api/home/data-access';
import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatListRepository } from '@mp/api/chat-list/data-access';
import { UserProfileRepository } from '@mp/api/users/data-access';
import { IChat } from '@mp/api/chat/util';

@CommandHandler(RejectUserCommand)
export class RejectUserHandler
  implements ICommandHandler<RejectUserCommand, IRejectUserResponse>
{
  constructor(
    private publisher: EventPublisher, 
    private readonly repository: HomeRepository, 
    private readonly chatRepo: ChatRepository, 
    private readonly chatList: ChatListRepository,
    private readonly userProfileRepository: UserProfileRepository
  ) {}

  async execute(command: RejectUserCommand) {
    console.log(`${RejectUserHandler.name}`);

    const request = command.request;
    const userId = request.userId;
    // get home data of current user
    const resp = await this.repository.getHomeValuesForUser(userId) as IUserRef;
    // get user profile of accepted user
    const swipedUser = (await this.userProfileRepository.getUserProfile(request.swipedUserId))?.data();
    if (swipedUser == null || swipedUser == undefined) throw new Error('User not found');
    // created IUserMatch object for accepted user
    const userMatch: IUserMatch = {user:swipedUser, match: resp.accepted.includes(swipedUser.userId)};
    // check that it exists because vscode complains >:(
    if(!userMatch.user?.userId) throw new Error('User ID is null');
    // create home object
    const data: IParsingData = {userId:userId, userRef:resp};
    const home = this.publisher.mergeObjectContext(Home.fromData(data));

    // accept user
    home.rejectUser(userMatch);
    home.commit();

    // return home object
    const response: IAcceptUserResponse = {home: home.toJSON()};
    return response;
  }
}
