import { UserProfileModule as UserProfileDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands';
import { UserCreatedHandler } from './events';
import { UsersSagas } from './user-profile.sagas';
import { UsersService } from './user-profile.service';
export const CommandHandlers = [CreateUserHandler];
export const EventHandlers = [UserCreatedHandler];

@Module({
  imports: [CqrsModule, UserProfileDataAccessModule],
  providers: [UsersService, ...CommandHandlers, ...EventHandlers, UsersSagas],
  exports: [UsersService],
})
export class UsersModule {}
