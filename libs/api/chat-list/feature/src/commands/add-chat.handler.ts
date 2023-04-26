import { ChatListRepository } from "@mp/api/chat-list/data-access";
import { AddChatCommand, IAddChatResponse, IChatList } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Chatlist } from "../models";

@CommandHandler(AddChatCommand)
export class AddChatHandler
    implements ICommandHandler<AddChatCommand, IAddChatResponse>{
    constructor(private publisher: EventPublisher, private repository:ChatListRepository) {}
    
    async execute(command: AddChatCommand) {
        console.log(`${AddChatHandler.name}`);

        const request = command.request;
        const userId=request.userId;
        const req = await this.repository.getForUserID(request.userId);
        if(!req) throw new Error('Chatlist not found');
        const data:IChatList = {
            userId:userId,
            chatList:req.chatList
        };
        const chatList = this.publisher.mergeObjectContext(Chatlist.fromData(data));
        chatList.addChat(request.chatRef);
        chatList.commit();
        const response: IAddChatResponse = {chat:chatList};
        return response;
    }
}