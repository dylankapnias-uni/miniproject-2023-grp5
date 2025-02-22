import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings.routing';
import { SettingsState } from '@mp/app/settings/data-access';
import { SettingsApi } from '@mp/app/settings/data-access';
@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([SettingsState]),
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  exports: [SettingsPage],
  providers: [SettingsApi]

})
export class SettingsPageModule {}
