import { ChatListRepository } from "@mp/api/chat-list/data-access";
import { AddChatCommand, CreateChatListCommand, IAddChatResponse, IChatList, ICreateChatListResponse } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Chatlist } from "../models";

@CommandHandler(CreateChatListCommand)
export class CreateChatListHandler
    implements ICommandHandler<CreateChatListCommand, ICreateChatListResponse>{
    constructor(private publisher: EventPublisher, private repository:ChatListRepository) {}
    
    async execute(command: CreateChatListCommand) {
        console.log(`${CreateChatListHandler.name}`);

        const request = command.request;
        const userId=request.userId;
        const data:IChatList={userId:userId,chatList:[]};
        const chatList = this.publisher.mergeObjectContext(Chatlist.fromData(data));
        chatList.create();
        chatList.commit();
        const response: ICreateChatListResponse = {chat:chatList};
        return response;
    }
}