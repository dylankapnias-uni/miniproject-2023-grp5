import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { AddTimeQuery, IAddTimeResponse } from '@mp/api/chat/util';
import { ChatRepository } from "@mp/api/chat/data-access";
@QueryHandler(AddTimeQuery)
export class AddTimeHandler 
implements IQueryHandler<AddTimeQuery, IAddTimeResponse> {
  constructor(private readonly repository: ChatRepository) {}
  async execute(query: AddTimeQuery): Promise<IAddTimeResponse> {
    console.log(`${AddTimeHandler.name}`);

    const request = query.request;
    const response = await this.repository.updateTime(request.chatId, request.time);

    if (response == undefined) throw new Error('Chat not found');
    
    return {chatId: request.chatId, time: response};
  }
}