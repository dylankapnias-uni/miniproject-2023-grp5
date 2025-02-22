import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ChatService } from "./chat.service";
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateChatRequest, ICreateChatResponse, IChat, CreateChatQuery, IGetChatRequest, IGetChatResponse, IMessages, GetChatQuery, ISendMessageRequest, ISendMessageResponse, SendMessageCommand } from "@mp/api/chat/util";
import { Timestamp } from 'firebase/firestore';


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
                chatId: "mockChat",
                messages: null,
                timeAdderId: "mockChat",
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
                chatId: "mockChat",
                messages: null,
                timeAdderId: "mockChat",
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
                userId: "anotherUser"
            }

            const mockChat: IChat = {
                chatId: "mockChat",
                messages: [mockMessage],
                timeAdderId: "mockChat",
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
            expect(result.messages).not.toBeNull
            expect(result.messages?.messages?.length).toBe(1)
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
                userId: ""
            }

            const mockChat: IChat = {
                chatId: "mockChat",
                messages: [mockMessage],
                timeAdderId: "mockChat",
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
            expect(result.messages).not.toBeNull
            expect(result.messages?.messages?.length).toBe(1)
        }),

        it("GetChat with valid chat id and no messages and users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }

            const mockChat: IChat = {
                chatId: "mockChat",
                messages: null,
                timeAdderId: "mockChat",
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
            expect(result.messages).not.toBeNull
            expect(result.messages?.messages).toBe(null)
        }) ,

        it("GetChat with valid chat id and no messages and no users", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "mockChat"
            }

            const mockChat: IChat = {
                chatId: "mockChat",
                messages: null,
                timeAdderId: "mockChat",
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
            expect(result.messages).not.toBeNull
            expect(result.messages?.messages).toBe(null)
        }),

        it("GetChat with invalid chat id", async () => {
            //given
            const mockRequest: IGetChatRequest = {
                chatId: "invalid"
            }

            jest.spyOn(queryBus, "execute").mockResolvedValueOnce(null)

            //when
            const result = await chatService.getChat(mockRequest)

            //then
            expect(queryBus.execute).toHaveBeenCalledWith(new GetChatQuery(mockRequest))
            expect(result).toBe(null)
        })
   
    }),

    describe("SendMessage", ()=>{
        it("SendMessage with valid chat and user and message", async () => {
            //given
            const timeStamp = Timestamp.now()
            const mockMessage: IMessages = {
                message: "This is a message",
                time: timeStamp,
                userId: "mockUser"
            }
            const mockRequest: ISendMessageRequest = {
                userId: "mockUser",
                chatId: "mockChat",
                message: mockMessage
            }
            const mockChat: IChat = {
                chatId: "mockChat",
                messages: [mockMessage],
                timeAdderId: "mockChat",
                timeRemaining: 5,
                totalTimeUsed: 0,
                users: ["anotherUser"]
            }
            const mockResponse: ISendMessageResponse = {
                chat: mockChat
            }

            jest.spyOn(commandBus, "execute").mockResolvedValueOnce(mockResponse)

            //when
            const result = await chatService.sendMessage(mockRequest)

            //then
            expect(commandBus.execute).toHaveBeenCalledWith(new SendMessageCommand(mockRequest))
            expect(result).toBe(mockResponse)
        }),

        it("SendMessage with valid chat and invalid user and message", async () => {
            //given
            const timeStamp = Timestamp.now()
            const mockMessage: IMessages = {
                message: "This is a message",
                time: timeStamp,
                userId: "mockUser"
            }
            const mockRequest: ISendMessageRequest = {
                userId: "invalidUser",
                chatId: "mockChat",
                message: mockMessage
            }
            

            jest.spyOn(commandBus, "execute").mockResolvedValueOnce(null)

            //when
            const result = await chatService.sendMessage(mockRequest)

            //then
            expect(commandBus.execute).toHaveBeenCalledWith(new SendMessageCommand(mockRequest))
            expect(result).toBe(null)
        }),

        it("SendMessage with invalid chat and valid user and message", async () => {
            //given
            const timeStamp = Timestamp.now()
            const mockMessage: IMessages = {
                message: "This is a message",
                time: timeStamp,
                userId: "mockUser"
            }
            const mockRequest: ISendMessageRequest = {
                userId: "mockUser",
                chatId: "invalid",
                message: mockMessage
            }
            

            jest.spyOn(commandBus, "execute").mockResolvedValueOnce(null)

            //when
            const result = await chatService.sendMessage(mockRequest)

            //then
            expect(commandBus.execute).toHaveBeenCalledWith(new SendMessageCommand(mockRequest))
            expect(result).toBe(null)
        })
    })



});