import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetTimeQuery, IGetTimeResponse } from '@mp/api/chat/util';
import { ChatRepository } from "@mp/api/chat/data-access";
@QueryHandler(GetTimeQuery)
export class GetTimeHandler 
implements IQueryHandler<GetTimeQuery, IGetTimeResponse> {
  constructor(private readonly repository: ChatRepository) {}
  async execute(query: GetTimeQuery): Promise<IGetTimeResponse> {
    console.log(`${GetTimeHandler.name}`);

    const request = query.request;
    const response = await this.repository.getTime(request.chatId);

    if (response == undefined || response == null) throw new Error('Chat not found');
    
    return {chatId: request.chatId, time: response};
  }
}