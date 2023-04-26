import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PrivacyPolicyPage } from './privacy-policy.page';
import { PrivacyPolicyPageRoutingModule } from './privacy-policy.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PrivacyPolicyPageRoutingModule
  ],
  declarations: [PrivacyPolicyPage],
  exports: [PrivacyPolicyPage]

})
export class PrivacyPolicyPageModule {}
