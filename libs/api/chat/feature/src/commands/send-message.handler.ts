import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { SendMessageCommand, ISendMessageResponse } from "@mp/api/chat/util";
import {ChatRepository} from '@mp/api/chat/data-access'
@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand, ISendMessageResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository:ChatRepository) {}
  
    async execute(command: SendMessageCommand) {
      console.log(`${SendMessageHandler.name}`);
  
      const request = command.request;
      const userId = request.userId;
    
      
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

