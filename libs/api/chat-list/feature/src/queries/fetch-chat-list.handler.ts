import { FetchChatListCommand, FetchChatListQuery, IChatList, IChatReferences, IFetchChatListResponse } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChatListRepository } from "@mp/api/chat-list/data-access";

@QueryHandler(FetchChatListQuery)
export class FetchChatListHandler
    implements IQueryHandler<FetchChatListQuery,IFetchChatListResponse>{
    constructor(private publisher: EventPublisher, private repository:ChatListRepository ) {}
    async execute(query: FetchChatListQuery) {
        console.log(`${FetchChatListHandler.name}`);
        const request = query.request;
        const response: IChatReferences[] = (await this.repository.getForUserID(request.userId));
        const data: IFetchChatListResponse = {chatRefs:response};
        return data;
    }
}