import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendMessageHandler } from './commands/send-message.handler';
import { GetChatHandler, CreateChatHandler } from './queries';
import { ChatService } from './chat.service';

export const CommandHandlers = [
  SendMessageHandler,
];
export const EventHandlers = [
  SendMessageHandler,
];
export const QueryHandlers = [
    GetChatHandler,
    CreateChatHandler
]

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [
    ChatService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [ChatService],
})
export class ChatModule {}
