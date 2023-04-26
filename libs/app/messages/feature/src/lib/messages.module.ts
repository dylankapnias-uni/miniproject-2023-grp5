import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPage } from './messages.page';
import { IonicModule } from '@ionic/angular';
import { MessagesRouting } from './messages.routing';
import { NgxsModule } from '@ngxs/store';
import { MessagesState } from '@mp/app/messages/data-access';
import { SettingsState } from '@mp/app/settings/data-access';
import { ProfileState } from '@mp/app/profile/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, MessagesRouting,  NgxsModule.forFeature([MessagesState, SettingsState, ProfileState])],
  declarations: [MessagesPage]
})
export class MessagesModule {}