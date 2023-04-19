import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SettingsPage } from './lib/settings.page';
import { SettingsPageRoutingModule } from './app-settings-feature.routing';
import { SettingsState } from 'libs/app/settings/data-access/src';
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
