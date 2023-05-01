import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { SendMessageCommand, ISendMessageResponse, IChat } from "@mp/api/chat/util";
import { ChatRepository } from '@mp/api/chat/data-access'
// Shit, can this guy even code???
// I'm sorry
import { Chat } from "../models";
import {NotificationRepository} from '@mp/api/notifications/data-access';
@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand, ISendMessageResponse>
{
    constructor(private publisher: EventPublisher, private readonly repository:ChatRepository, private readonly notifRepo:NotificationRepository) {}
  
    async execute(command: SendMessageCommand) {
      console.log(`${SendMessageHandler.name}`);
      console.log("please fucking work, I beg I don't want to deal with this fuck");
      const request = command.request;
    
      // const now: any = Timestamp.fromDate(new Date());
      // const chatResp = (await this.chatRepo.createChat(data));
      // const notifData: IInbox={
      //   content:"You a new Message!",
      //   recipient:request.userId,
      //   sender:userId,
      //   time: now
      // };
      // const notifResp = (await this.notifRepository.sendNotification(userId,notifData));


      if(!request.message.message) throw new Error('Message is null');
      const resp = await this.repository.getChat(request.chatId) as IChat;
      const chat = this.publisher.mergeObjectContext(Chat.fromData(resp));
      chat.sendMessage(request.message);
      chat.commit();
      console.log("yeah i don't fucking know what to type anymore bro I;mso tired")
      const response: ISendMessageResponse ={chat:chat} as ISendMessageResponse;
      
      return response;
    }
  }

