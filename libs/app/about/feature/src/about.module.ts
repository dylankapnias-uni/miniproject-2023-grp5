import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about.page';
import { AboutPageRoutingModule } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage],
  exports: [AboutPage]

})
export class AboutPageModule {}
