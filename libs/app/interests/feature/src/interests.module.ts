import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { InterestsPage } from './interests.page';
import { interestsPageRoutingModule } from './interests.routing';
import {  SettingsState, SettingsApi} from '@mp/app/settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    interestsPageRoutingModule,
    NgxsModule.forFeature([SettingsState])
  ],
  declarations: [InterestsPage],
  exports: [InterestsPage],
  providers: [SettingsApi]

})
export class interestsPageModule {}