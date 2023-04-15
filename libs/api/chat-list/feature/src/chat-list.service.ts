import { Injectable } from '@angular/core';
import { CommandBus } from '@nestjs/cqrs';
import { 
    ICreateChatRequest,
    IFetchChatRequest,
    AddChatCommand,
    FetchChatListCommand,
    IAddChatResponse,
    IFetchChatResponse
} from '@mp/api/chat-list/util'

@Injectable()
export class ChatService {
  constructor(private readonly commandBus: CommandBus) {}

    async createChat(
        request: ICreateChatRequest
        ): Promise<IAddChatResponse> {
        return await this.commandBus.execute<
            AddChatCommand, 
            IAddChatResponse
        >(new AddChatCommand(request));
    }

    async fetchChatList(
        request: IFetchChatRequest
        ): Promise<IFetchChatResponse> {
        return await this.commandBus.execute<
            FetchChatListCommand, 
            IFetchChatResponse
        >(new FetchChatListCommand(request));
    }
}