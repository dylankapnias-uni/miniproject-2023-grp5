import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetChatQuery, IGetChatResponse } from '@mp/api/chat/util';
import { ChatRepository } from "@mp/api/chat/data-access";
@QueryHandler(GetChatQuery)
export class GetChatHandler 
implements IQueryHandler<GetChatQuery, IGetChatResponse> {
  constructor(private readonly repository: ChatRepository) {}
  async execute(query: GetChatQuery): Promise<IGetChatResponse> {
    console.log(`${GetChatHandler.name}`);

    const request = query.request;
    const response = await this.repository.getChat(request.chatId);
    //if (response == undefined) throw new Error('Chat not found');
    
    return {messages: response};
  }
}