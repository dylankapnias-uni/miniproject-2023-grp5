import { Module } from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';

@Module({
  providers: [UserProfileRepository],
  exports: [UserProfileRepository],
})
export class UserProfileModule {}
