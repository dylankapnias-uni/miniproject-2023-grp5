import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPage } from './messages.page';
import { IonicModule } from '@ionic/angular';
import { MessagesRouting } from './messages.routing';
import { NgxsModule } from '@ngxs/store';
import { MessagesState, MessagesApi } from '@mp/app/messages/data-access';
import { SettingsState, SettingsApi } from '@mp/app/settings/data-access';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, MessagesRouting,  NgxsModule.forFeature([MessagesState, SettingsState, ProfileState])],
  declarations: [MessagesPage],
  providers:[ProfilesApi, MessagesApi, SettingsApi]
})
export class MessagesModule {}