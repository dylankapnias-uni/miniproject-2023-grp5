import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UpdatesPage } from './updates.page';
import { UpdatesPageRoutingModule } from './updates.routing';

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