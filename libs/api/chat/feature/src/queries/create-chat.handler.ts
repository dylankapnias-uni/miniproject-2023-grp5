import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { IChat, CreateChatQuery,ICreateChatResponse } from "@mp/api/chat/util";
import {ChatRepository} from '@mp/api/chat/data-access';

@QueryHandler(CreateChatQuery)
export class CreateChatHandler implements IQueryHandler<CreateChatQuery, ICreateChatResponse>
{
    constructor(private readonly repository:ChatRepository) {}
  
    async execute(Query: CreateChatQuery) {
      console.log(`${CreateChatHandler.name}`);
  
      const request = Query.request;
      
      const data: IChat = {
        chatID: request.chatId,
        messages: [],
        timeAdderID: request.userId,
        timeRemaining: 1800,
        totalTimeUsed: 0,
        users: request.users,
      }
      
      const chat = await this.repository.createChat(data);
      if(!chat)
        throw new Error('Chat not created');
      data.chatID = chat.chatID;
      const response: ICreateChatResponse = {chat: data};
      
      return response;
    }
  }

