import { ChatListRepository } from '@mp/api/chat-list/data-access';
import { ChatListCreatedEvent } from '@mp/api/chat-list/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ChatListCreatedEvent)
export class ChatListCreatedHandler
  implements IEventHandler<ChatListCreatedEvent>
{
  constructor(private readonly repository: ChatListRepository) {}

  async handle(event: ChatListCreatedEvent) {
    console.log(`${ChatListCreatedHandler.name}`);
    await this.repository.createChatList(event.chat.userId);
  }
}
