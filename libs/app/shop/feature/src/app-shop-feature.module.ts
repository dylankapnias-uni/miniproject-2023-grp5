import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ShopPage } from './lib/shop.page';
import { ShopPageRoutingModule } from './app-shop-feature.routing';
import { SettingsState } from '@mp/app/settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([SettingsState]),
    IonicModule,
    ShopPageRoutingModule
  ],
  declarations: [ShopPage],
  exports: [ShopPage]

})
export class ShopPageModule {}
