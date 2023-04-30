import { ChatModule as ChatRepoModule} from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendMessageHandler } from './commands';
import { GetChatHandler, CreateChatHandler } from './queries';
import { ChatService } from './chat.service';
import { MessageSentHandler } from './events';
export const CommandHandlers = [
  SendMessageHandler,
];
export const EventHandlers = [
  MessageSentHandler,
];
export const QueryHandlers = [
    GetChatHandler,
    CreateChatHandler
]

@Module({
  imports: [CqrsModule, ChatRepoModule],
  providers: [
    ChatService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [ChatService],
})
export class ChatModule {}
