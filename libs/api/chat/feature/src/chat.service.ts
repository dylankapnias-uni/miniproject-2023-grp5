import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { 
  CreateChatQuery, 
  GetChatQuery, 
  ICreateChatRequest, 
  ICreateChatResponse, 
  IGetChatRequest, 
  IGetChatResponse, 
  ISendMessageRequest, 
  ISendMessageResponse, 
  SendMessageCommand 
} from '@mp/api/chat/util'
import { AddChatCommand } from '@mp/api/chat-list/util';

@Injectable()
export class ChatService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus:QueryBus) {}

    async createChat(
        request: ICreateChatRequest
        ): Promise<ICreateChatResponse> {
        return await this.commandBus.execute<
            CreateChatQuery, 
            ICreateChatResponse
        >(new CreateChatQuery(request));
    }

    async getChat(
        request: IGetChatRequest
        ): Promise<IGetChatResponse> {
        return await this.queryBus.execute<
            GetChatQuery, 
            IGetChatResponse
        >(new GetChatQuery(request));
    }

    async sendMessage(
      request: ISendMessageRequest
      ): Promise<ISendMessageResponse> {
      return await this.commandBus.execute<
          SendMessageCommand, 
          ISendMessageResponse
      >(new SendMessageCommand(request));
  }

}