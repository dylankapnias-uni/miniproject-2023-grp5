import { ChatListModule as ChatListDataAccessModule } from '@mp/api/chat-list/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddChatHandler, CreateChatListHandler } from './commands';
import { ChatAddedHandler, ChatListCreatedHandler } from './events';
import { FetchChatListHandler } from './queries';
import { ChatListService } from './chat-list.service';
import { ChatListSagas } from './chat-list.sagas';
import {UserProfileModule} from "@mp/api/users/data-access";
export const CommandHandlers = [
  CreateChatListHandler,
    AddChatHandler
];
export const EventHandlers = [
  ChatListCreatedHandler,
  ChatAddedHandler
];
export const QueryHandlers = [
  FetchChatListHandler
]

@Module({
  imports: [CqrsModule, ChatListDataAccessModule, UserProfileModule],
  providers: [
    ChatListService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ChatListSagas,
  ],
  exports: [ChatListService],
})
export class ChatListModule {}
