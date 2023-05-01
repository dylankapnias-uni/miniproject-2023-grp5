import { ChatListRepository } from '@mp/api/chat-list/data-access';
import { ChatAddedEvent } from '@mp/api/chat-list/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ChatAddedEvent)
export class ChatAddedHandler
  implements IEventHandler<ChatAddedEvent>
{
  constructor(private readonly repository: ChatListRepository) {}

  async handle(event: ChatAddedEvent) {
    console.log(`${ChatAddedHandler.name}`);
    if(!event.chat.chatList) throw new Error('ChatRef not found');
    await this.repository.addToChatList(
      event.chat.userId, 
      event.chat.chatList[event.chat.chatList.length-1].chatRef, 
      event.chat.chatList[event.chat.chatList.length-1].otherUserId
    );
  }
}
