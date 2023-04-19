import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './lib/account.page';
import { AccountPageRoutingModule } from './account.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    AccountPageRoutingModule,
    FormsModule
  ],
  declarations: [AccountPage],
  exports: [AccountPage]

})
export class AccountPageModule {}
