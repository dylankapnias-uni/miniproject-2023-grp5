import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { SubtractTimeQuery, ISubtractTimeResponse } from '@mp/api/chat/util';
import { ChatRepository } from "@mp/api/chat/data-access";
@QueryHandler(SubtractTimeQuery)
export class SubtractTimeHandler 
implements IQueryHandler<SubtractTimeQuery, ISubtractTimeResponse> {
  constructor(private readonly repository: ChatRepository) {}
  async execute(query: SubtractTimeQuery): Promise<ISubtractTimeResponse> {
    console.log(`${SubtractTimeHandler.name}`);

    const request = query.request;
    const response = await this.repository.updateTime(request.chatId, request.time);

    if (response == undefined) throw new Error('Chat not found');
    
    return {chatId: request.chatId, time: response};
  }
}