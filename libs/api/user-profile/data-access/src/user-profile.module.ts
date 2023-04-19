import { Module } from '@nestjs/common';
import { ProfileRepository } from './user-profile.repository';

@Module({
  providers: [ProfileRepository],
  exports: [ProfileRepository],
})
export class UserProfileModule {}