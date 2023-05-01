import { ChatModule as ChatRepoModule} from '@mp/api/chat/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendMessageHandler } from './commands';
import { GetChatHandler, CreateChatHandler, AddTimeHandler, SubtractTimeHandler } from './queries';
import { ChatService } from './chat.service';
import { MessageSentHandler } from './events';
import { NotificationRepository } from '@mp/api/notifications/data-access';
export const CommandHandlers = [
  SendMessageHandler,
];
export const EventHandlers = [
  MessageSentHandler,
];
export const QueryHandlers = [
    AddTimeHandler,
    SubtractTimeHandler,
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
    NotificationRepository
  ],
  exports: [ChatService],
})
export class ChatModule {}
