import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './lib/settings.page';
import { SettingsPageRoutingModule } from './app-settings-feature.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  exports: [SettingsPage]

})
export class SettingsPageModule {}
