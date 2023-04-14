import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { InterestsPage } from './lib/interests.page';
import { interestsPageRoutingModule } from './app-interests-feature.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    interestsPageRoutingModule
  ],
  declarations: [InterestsPage],
  exports: [InterestsPage]

})
export class interestsPageModule {}