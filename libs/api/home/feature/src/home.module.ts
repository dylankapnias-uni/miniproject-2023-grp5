import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AcceptUserHandler, CreateUserHomeHandler, RejectUserHandler } from './commands';
import { HomeDataAccessModule } from '@mp/api/home/data-access';
import { UserAcceptedHandler, UserHomeCreatedHandler, UserRejectedHandler } from './events';
import { HomeService } from './home.service';
import { RetrieveHomeUsersHandler } from './queries';
import { HomeSagas } from './home.sagas';
import { ChatRepository } from '@mp/api/chat/data-access';
import { ChatListRepository } from '@mp/api/chat-list/data-access';
import { UserProfileRepository } from '@mp/api/users/data-access';
import { NotificationRepository } from '@mp/api/notifications/data-access';
export const CommandHandlers = [AcceptUserHandler, RejectUserHandler, CreateUserHomeHandler];
export const EventHandlers = [UserAcceptedHandler, UserRejectedHandler, UserHomeCreatedHandler];
export const QueryHandlers = [RetrieveHomeUsersHandler];

@Module({
  imports: [
    CqrsModule, 
    HomeDataAccessModule, 
  ],
  providers: [
    HomeService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    HomeSagas,
    ChatRepository,
    ChatListRepository,
    UserProfileRepository,
    NotificationRepository
  ],
  exports: [HomeService],
})
export class HomeModule {}
