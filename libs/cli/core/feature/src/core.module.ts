import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UserProfileModule } from '@mp/api/users/feature';
import { Module } from '@nestjs/common';
import { SeedCommand } from './commands';

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UserProfileModule],
  providers: [SeedCommand],
})
export class CoreModule {}
