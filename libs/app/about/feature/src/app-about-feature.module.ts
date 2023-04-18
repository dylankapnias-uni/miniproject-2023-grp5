import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AboutPage } from './lib/about.page';
import { AboutPageRoutingModule } from './app-about-feature.routing';

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
