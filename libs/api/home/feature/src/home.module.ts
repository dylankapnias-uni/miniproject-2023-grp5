import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AcceptUserHandler } from './commands';
import { HomeDataAccessModule } from '@mp/api/home/data-access';
import { UserAcceptedHandler } from './events/user-accepted.handler';
import { HomeService } from './home.service';

export const CommandHandlers = [AcceptUserHandler];
export const EventHandlers = [UserAcceptedHandler];

@Module({
  imports: [CqrsModule, HomeDataAccessModule],
  providers: [
    HomeService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [HomeService],
})
export class HomeModule {}
