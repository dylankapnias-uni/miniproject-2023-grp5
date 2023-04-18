import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ShopPage } from './lib/shop.page';
import { ShopPageRoutingModule } from './app-shop-feature.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    ShopPageRoutingModule
  ],
  declarations: [ShopPage],
  exports: [ShopPage]

})
export class ShopPageModule {}
