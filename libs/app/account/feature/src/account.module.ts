import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './lib/account.page';
import { AccountPageRoutingModule } from './account.routing';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    AccountPageRoutingModule,
    NgxsModule.forFeature([SettingsState]),
    FormsModule
  ],
  declarations: [AccountPage],
  exports: [AccountPage]

})
export class AccountPageModule {}
