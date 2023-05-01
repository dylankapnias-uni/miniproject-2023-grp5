import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MessageBubbleModule } from './messages-bubble';
// import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
// import { NgxsModule } from '@ngxs/store';
import { ChatState, ChatApi } from '@mp/app/chat/data-access';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MessageBubbleModule,
    NgxsModule.forFeature([ChatState]),
  ],
  declarations: [],
  exports: [MessageBubbleModule],
  providers: [ChatApi],
})
export class MessagesModule {}