import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatCreatedEvent, MessageSentEvent } from '@mp/api/chat/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ChatCreatedEvent)
export class ChatCreatedHandler
  implements IEventHandler<ChatCreatedEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: ChatCreatedEvent) {
    console.log(`${ChatCreatedHandler.name}`);
    if(!event.chat) throw new Error('Chat not found');
    await this.repository.createChat(event.chat);
  }
}
