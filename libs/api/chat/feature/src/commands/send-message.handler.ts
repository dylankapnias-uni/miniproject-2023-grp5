import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { SendMessageCommand, ISendMessageResponse, IChat } from "@mp/api/chat/util";
import {ChatRepository} from '@mp/api/chat/data-access'
import { Chat } from "../models";
@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand, ISendMessageResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository:ChatRepository) {}
  
    async execute(command: SendMessageCommand) {
      console.log(`${SendMessageHandler.name}`);
  
      const request = command.request;
    
      
      if(!request.message.message) throw new Error('Message is null');
      const resp = await this.repository.getChat(request.chatId) as IChat;
      const chat = this.publisher.mergeObjectContext(Chat.fromData(resp));
      chat.sendMessage(request.message);
      chat.commit();
  
      const response: ISendMessageResponse ={chat:chat} as ISendMessageResponse;
      
      return response;
    }
  }

