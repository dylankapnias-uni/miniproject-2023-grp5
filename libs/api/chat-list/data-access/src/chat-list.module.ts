import { Module } from '@nestjs/common';
import { ChatListRepository } from './chat-list.repository';

@Module({
  providers: [ChatListRepository],
  exports: [ChatListRepository],
})
export class ChatListModule {}