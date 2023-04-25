import { UserProfileModule as UserProfileDataAccessModule } from '@mp/api/users/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler, UpdateUserProfileHandler, DeleteUserProfileHandler } from './commands';
import { UserCreatedHandler, UserProfileUpdatedHandler, UserProfileDeletedHandler } from './events';
import { GetUserProfileHandler } from './queries';
import { UsersSagas } from './user-profile.sagas';
import { UserProfileService } from './user-profile.service';

export const CommandHandlers = [
  CreateUserHandler,
  UpdateUserProfileHandler,
  DeleteUserProfileHandler
];

export const EventHandlers = [
  UserCreatedHandler,
  UserProfileUpdatedHandler,
  UserProfileDeletedHandler
];

export const QueryHandlers = [
  GetUserProfileHandler
];
@Module({
  imports: [CqrsModule, UserProfileDataAccessModule],
  providers: [
    UserProfileService, 
    ...CommandHandlers, 
    ...EventHandlers, 
    ...QueryHandlers, 
    UsersSagas
  ],
  exports: [UserProfileService],
})
export class UsersModule {}
