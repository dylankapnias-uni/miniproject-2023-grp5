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
  SendMessageCommand,
  IAddTimeRequest,
  IAddTimeResponse,
  ISubtractTimeRequest,
  ISubtractTimeResponse,
  AddTimeQuery,
  SubtractTimeQuery
} from '@mp/api/chat/util';

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

  async addTime(
    request: IAddTimeRequest,
  ): Promise<IAddTimeResponse> {
    return await this.queryBus.execute<
      AddTimeQuery,
      IAddTimeResponse
    >(new AddTimeQuery(request))
  }
  

  async subtractTime(
    request: ISubtractTimeRequest,
  ): Promise<ISubtractTimeResponse> {
    return await this.queryBus.execute<
      SubtractTimeQuery,
      ISubtractTimeResponse
    >(new SubtractTimeQuery(request));
  }
  

}