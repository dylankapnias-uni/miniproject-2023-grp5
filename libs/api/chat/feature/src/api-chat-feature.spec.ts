import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ChatService } from "./chat.service";
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateChatRequest, ICreateChatResponse, IChat, CreateChatQuery, IGetChatRequest } from "@mp/api/chat/util";


describe("Chat", () => {
    let commandBus: CommandBus
    let queryBus: QueryBus
    let chatService: ChatService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChatService, CommandBus, QueryBus],
          }).compile();
      
          chatService = module.get<ChatService>(ChatService);
          commandBus = module.get<CommandBus>(CommandBus);
          queryBus = module.get<QueryBus>(QueryBus)
    }),

    


});