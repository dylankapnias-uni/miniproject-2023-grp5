import { ChatListRepository } from "@mp/api/chat-list/data-access";
import { AddChatCommand, IAddChatResponse, IChatList } from "@mp/api/chat-list/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Chatlist } from "../models";

@CommandHandler(AddChatCommand)
export class AddChatHandler
    implements ICommandHandler<AddChatCommand, IAddChatResponse>{
    constructor(private publisher: EventPublisher, private repository:ChatListRepository) {}
    
    async execute(command: AddChatCommand) {
        console.log(`${AddChatHandler.name}`);

        const request = command.request;
        const userId =request.userId;
        const req = await this.repository.getForUserID(userId);
        const data:IChatList = {
            userId:userId,
            chatList:req.chatList
        };
        const chatList = this.publisher.mergeObjectContext(Chatlist.fromData(data));
        chatList.addChat(request.chatRef);
        chatList.commit(); 
        // const chatList = await this.repository.addToChatList(creatorID,request.chatRef.chatRef,request.chatRef.otherUserId);
        const response: IAddChatResponse = {chat:chatList.toJSON()};
        if (response.chat == null || response.chat == undefined)
            throw new Error("The chatlist got snapped or some shit idk man");
        return response;
    }
}