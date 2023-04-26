import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ShopPage } from './lib/shop.page';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
import { ShopPageRoutingModule } from './app-shop-feature.routing';
import { SettingsState, SettingsApi } from '@mp/app/settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([SettingsState, ProfileState]),
    IonicModule,
    ShopPageRoutingModule
  ],
  declarations: [ShopPage],
  exports: [ShopPage],
  providers: [ProfilesApi, SettingsApi]

})
export class ShopPageModule {}
