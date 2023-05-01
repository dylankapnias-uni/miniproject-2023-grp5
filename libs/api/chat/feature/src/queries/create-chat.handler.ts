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
        chatId: request.chatId,
        messages: [],
        timeAdderId: request.userId,
        timeRemaining: 2040,
        totalTimeUsed: 0,
        users: request.users,
      }
      
      const chat = await this.repository.createChat(data);
      if(!chat)
        throw new Error('Chat not created');
      data.chatId = chat.chatId;
      const response: ICreateChatResponse = {chat: data};
      
      return response;
    }
  }

