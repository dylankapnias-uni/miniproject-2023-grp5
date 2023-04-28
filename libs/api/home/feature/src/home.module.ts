import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AcceptUserHandler, CreateUserHomeHandler, RejectUserHandler } from './commands';
import { ChatListModule } from '@mp/api/chat-list/data-access';
import { ChatModule } from '@mp/api/chat/data-access';
import { UserProfileModule } from '@mp/api/users/data-access';
import { HomeDataAccessModule } from '@mp/api/home/data-access';
import { UserAcceptedHandler, UserHomeCreatedHandler, UserRejectedHandler } from './events';
import { HomeService } from './home.service';
import { RetrieveHomeUsersHandler } from './queries';

export const CommandHandlers = [AcceptUserHandler, RejectUserHandler, CreateUserHomeHandler];
export const EventHandlers = [UserAcceptedHandler, UserRejectedHandler, UserHomeCreatedHandler];
export const QueryHandlers = [RetrieveHomeUsersHandler];

@Module({
  imports: [CqrsModule, HomeDataAccessModule, ChatListModule, ChatModule, UserProfileModule],
  providers: [
    HomeService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [HomeService],
})
export class HomeModule {}
