import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPage } from './chat.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChatRouting } from './chat.routing';
import { NgxsModule } from '@ngxs/store';
import { ChatState } from '@mp/app/chat/data-access';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ChatRouting, NgxsModule.forFeature([ChatState, ProfileState])],
  declarations: [ChatPage],
  exports:[ChatPage],
  providers:[ProfilesApi]
})
export class ChatModule {}