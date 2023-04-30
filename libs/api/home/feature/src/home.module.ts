import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AcceptUserHandler, CreateUserHomeHandler, RejectUserHandler } from './commands';
import { HomeDataAccessModule } from '@mp/api/home/data-access';
import { UserAcceptedHandler, UserHomeCreatedHandler, UserRejectedHandler } from './events';
import { HomeService } from './home.service';
import { RetrieveHomeUsersHandler } from './queries';
import { HomeSagas } from './home.sagas';

export const CommandHandlers = [AcceptUserHandler, RejectUserHandler, CreateUserHomeHandler];
export const EventHandlers = [UserAcceptedHandler, UserRejectedHandler, UserHomeCreatedHandler];
export const QueryHandlers = [RetrieveHomeUsersHandler];

@Module({
  imports: [CqrsModule, HomeDataAccessModule],
  providers: [
    HomeService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    HomeSagas
  ],
  exports: [HomeService],
})
export class HomeModule {}
