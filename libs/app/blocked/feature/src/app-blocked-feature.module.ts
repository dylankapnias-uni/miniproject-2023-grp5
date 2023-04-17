import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BlockedPage } from './lib/blocked.page';
import { BlockedPageRoutingModule } from './app-blocked-feature.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule.forRoot(),
    BlockedPageRoutingModule
  ],
  declarations: [BlockedPage],
  exports: [BlockedPage]

})
export class BlockedPageModule {}