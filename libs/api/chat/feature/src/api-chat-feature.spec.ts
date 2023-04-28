import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ChatService } from "./chat.service";
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateChatRequest, ICreateChatResponse, IChat, CreateChatQuery, IGetChatRequest, IGetChatResponse, IMessages, GetChatQuery } from "@mp/api/chat/util";
import { Timestamp } from "firebase-admin/firestore";


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
    }),

    describe("GetChat", () => {
        it("GetChat with valid chat id and messages and users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }
            const timeStamp = Timestamp.now()
            const mockMessage: IMessages = {
                message: "This is a message",
                time: timeStamp,
                userID: "anotherUser"
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: [mockMessage],
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: ["anotherUser"]
            }

            const mockResponse: IGetChatResponse = {
                messages: mockChat
            }

            jest.spyOn(queryBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.getChat(mockRequest)

            //then
            expect(queryBus.execute).toHaveBeenCalledWith(new GetChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
            expect(result.messages.messages?.length).toBe(1)
        }),

        it("GetChat with valid chat id and messages and no users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }
            const timeStamp = Timestamp.now()
            const mockMessage: IMessages = {
                message: "This is a message",
                time: timeStamp,
                userID: ""
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: [mockMessage],
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: []
            }

            const mockResponse: IGetChatResponse = {
                messages: mockChat
            }

            jest.spyOn(queryBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.getChat(mockRequest)

            //then
            expect(queryBus.execute).toHaveBeenCalledWith(new GetChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
            expect(result.messages.messages?.length).toBe(1)
        }),

        it("GetChat with valid chat id and no messages and users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: null,
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: ["anotherUser"]
            }

            const mockResponse: IGetChatResponse = {
                messages: mockChat
            }

            jest.spyOn(queryBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.getChat(mockRequest)

            //then
            expect(queryBus.execute).toHaveBeenCalledWith(new GetChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
            expect(result.messages.messages).toBe(null)
        }) ,

        it("GetChat with valid chat id and no messages and no users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }

            const mockChat: IChat = {
                chatID: "mockChat",
                messages: null,
                timeAdderID: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: []
            }

            const mockResponse: IGetChatResponse = {
                messages: mockChat
            }

            jest.spyOn(queryBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.getChat(mockRequest)

            //then
            expect(queryBus.execute).toHaveBeenCalledWith(new GetChatQuery(mockRequest))
            expect(result).toBe(mockResponse)
            expect(result.messages.messages).toBe(null)
        })
    })



});