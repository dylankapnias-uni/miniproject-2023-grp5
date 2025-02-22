import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus} from '@nestjs/cqrs';
import { 
    ICreateChatListRequest,
    IFetchChatListRequest,
    AddChatCommand,
    IAddChatResponse,
    IFetchChatListResponse,
    ICreateChatListResponse,
    CreateChatListCommand,
    FetchChatListQuery,
    IAddChatRequest
} from '@mp/api/chat-list/util'

@Injectable()
export class ChatListService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus:QueryBus) {}

    async createChatList(
        request: ICreateChatListRequest
        ): Promise<ICreateChatListResponse> {
        return await this.commandBus.execute<
            CreateChatListCommand, 
            ICreateChatListResponse
        >(new CreateChatListCommand(request));
    }

    async fetchChatList(
        request: IFetchChatListRequest
        ): Promise<IFetchChatListResponse> {
        return await this.queryBus.execute<
            FetchChatListQuery, 
            IFetchChatListResponse
        >(new FetchChatListQuery(request));
    }

    async addChat(
        request: IAddChatRequest
        ): Promise<IAddChatResponse> {
        return await this.commandBus.execute<
            AddChatCommand, 
            IAddChatResponse
        >(new AddChatCommand(request));
    }

}