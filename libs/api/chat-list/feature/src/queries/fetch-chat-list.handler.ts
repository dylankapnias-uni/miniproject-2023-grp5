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
        //TODO rename stuff to be suitable for all ages
        const data2ElectricBoogaloo = await this.repository.getForUserID(request.userId);
        if(data2ElectricBoogaloo == undefined || data2ElectricBoogaloo == null) throw new Error("Fucking die typescript")
        const response: IChatList = (data2ElectricBoogaloo);
        const data: IFetchChatListResponse = {chatList: response};
        return data;
    }
}