import { Module } from '@nestjs/common';
import { UserProfileRepository } from './users.repository';

@Module({
  providers: [UserProfileRepository],
  exports: [UserProfileRepository],
})
export class UsersModule {}
