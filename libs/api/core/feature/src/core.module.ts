import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UserProfileModule } from '@mp/api/users/feature';
import { SettingsModule } from '@mp/api/settings/feature';
import { NotificationModule } from '@mp/api/notifications/feature';
import { HomeModule } from '@mp/api/home/feature';
import { ChatModule } from '@mp/api/chat/feature';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule, 
    EventstoreModule, 
    ProfilesModule, 
    UserProfileModule, 
    SettingsModule, 
    NotificationModule,
    HomeModule,
    ChatModule
  ],
})
export class CoreModule {}
