import { CommandBus } from "@nestjs/cqrs";
import { ChatService } from "./chat.service";
import { Test, TestingModule } from '@nestjs/testing';


describe("Chat", () => {
    let commandBus: CommandBus
    let chatService: ChatService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ChatService, CommandBus],
          }).compile();
      
          chatService = module.get<ChatService>(ChatService);
          commandBus = module.get<CommandBus>(CommandBus);
    })


});