import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddChatHandler, CreateChatListHandler } from './commands';
import { ChatAddedEvent, ChatListCreatedEvent } from '@mp/api/chat-list/util';
import { FetchChatListHandler } from './queries';
import { ChatListService } from './chat-list.service';

export const CommandHandlers = [
  CreateChatListHandler,
  AddChatHandler
];
export const EventHandlers = [
  ChatListCreatedEvent,
  ChatAddedEvent
];
export const QueryHandlers = [
    FetchChatListHandler
]

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [
    ChatListService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [ChatListService],
})
export class ProfilesModule {}
