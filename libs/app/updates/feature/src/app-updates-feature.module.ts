import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UpdatesPage } from './lib/updates.page';
import { UpdatesPageRoutingModule } from './app-updates-feature.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UpdatesPageRoutingModule
  ],
  declarations: [UpdatesPage],
  exports: [UpdatesPage]

})
export class UpdatesPageModule {}