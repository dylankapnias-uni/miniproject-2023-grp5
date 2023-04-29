import { ChatRepository } from '@mp/api/chat/data-access';
import { MessageSentEvent } from '@mp/api/chat/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageSentEvent)
export class MessageSentHandler
  implements IEventHandler<MessageSentEvent>
{
  constructor(private readonly repository: ChatRepository) {}

  async handle(event: MessageSentEvent) {
    console.log(`${MessageSentHandler.name}`);
    if(!event.chat.messages) throw new Error('Messages not found');
    await this.repository.sendMessage(event.chat.chatId, event.chat.messages[event.chat.messages.length-1]);
  }
}
