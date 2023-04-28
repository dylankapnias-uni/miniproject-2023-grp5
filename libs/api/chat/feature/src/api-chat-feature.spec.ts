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

    describe("CreateChat", () => {
        it("Create chat with users", async () => {
            //given
            const mockRequest: ICreateChatRequest = {
                userId: "mockUser",
                chatId: "mockChat",
                users: ["anotherUser"]
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: null,
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: ["anotherUser"]
            }

            const mockResponse: ICreateChatResponse = {
                chat: mockChat
            }

            jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.createChat(mockRequest)

            //then
            expect(commandBus.execute).toHaveBeenCalledWith(new CreateChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
            expect(result.chat.users[0]).toBe("anotherUser")
        }),
        
        it("Create chat without users", async () => {
            //given
            const mockRequest: ICreateChatRequest = {
                userId: "mockUser",
                chatId: "mockChat",
                users: []
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: null,
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: []
            }

            const mockResponse: ICreateChatResponse = {
                chat: mockChat
            }

            jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.createChat(mockRequest)

            //then
            expect(commandBus.execute).toHaveBeenCalledWith(new CreateChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
        })
    })



});