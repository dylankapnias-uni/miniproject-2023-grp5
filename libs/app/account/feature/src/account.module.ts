import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './account.page';
import { AccountPageRoutingModule } from './account.routing';
import { NgxsModule } from '@ngxs/store';
import { SettingsState, SettingsApi } from '@mp/app/settings/data-access';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    AccountPageRoutingModule,
    NgxsModule.forFeature([SettingsState, ProfileState]),
    FormsModule
  ],
  declarations: [AccountPage],
  exports: [AccountPage],
  providers: [SettingsApi, ProfilesApi]

})
export class AccountPageModule {}
