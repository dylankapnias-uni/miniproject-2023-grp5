import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SettingsState, SettingsApi } from '@mp/app/settings/data-access';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
import { BlockedPage } from './blocked.page';
import { BlockedPageRoutingModule } from './blocked.routing';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule.forRoot(),
    BlockedPageRoutingModule,
    NgxsModule.forFeature([SettingsState, ProfileState])
  ],
  declarations: [BlockedPage],
  exports: [BlockedPage],
  providers: [SettingsApi, ProfilesApi]

})
export class BlockedPageModule {}