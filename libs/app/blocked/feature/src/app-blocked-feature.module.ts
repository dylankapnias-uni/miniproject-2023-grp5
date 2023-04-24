import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';
import { BlockedPage } from './lib/blocked.page';
import { BlockedPageRoutingModule } from './app-blocked-feature.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule.forRoot(),
    BlockedPageRoutingModule,
    NgxsModule.forFeature([SettingsState])
  ],
  declarations: [BlockedPage],
  exports: [BlockedPage]

})
export class BlockedPageModule {}