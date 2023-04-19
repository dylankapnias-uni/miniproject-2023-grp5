import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccountPage } from './lib/account.page';
import { AccountPageRoutingModule } from './app-account-feature.routing';
import { AccountState } from '@mp/app/account/data-access';

@NgModule({
  imports: [
    CommonModule,
 
    IonicModule,
    AccountPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forFeature([AccountState])
  ],
  declarations: [AccountPage],
  exports: [AccountPage]

})
export class AccountPageModule {}
