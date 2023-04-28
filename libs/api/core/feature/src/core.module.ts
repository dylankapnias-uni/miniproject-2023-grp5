import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UserProfileModule } from '@mp/api/users/feature';
import { SettingsModule } from '@mp/api/settings/feature';
import { NotificationModule } from '@mp/api/notifications/feature';
import { ChatListModule } from '@mp/api/chat-list/feature';
import { HomeModule } from '@mp/api/home/feature';
import { ChatModule } from '@mp/api/chat/feature';
import { InterestsModule } from '@mp/api/interests/feature';
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
    ChatModule,
    ChatListModule,
    InterestsModule
  ],
})
export class CoreModule {}
