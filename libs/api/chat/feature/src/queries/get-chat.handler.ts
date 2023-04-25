import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetChatQuery, IGetChatResponse } from '@mp/api/chat/util';
@QueryHandler(GetChatQuery)
export class GetChatHandler 
implements IQueryHandler<GetChatQuery, IGetChatResponse> {
  async execute(query: GetChatQuery): Promise<IGetChatResponse> {
    // do something
  }
}