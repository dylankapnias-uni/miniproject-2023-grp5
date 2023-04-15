import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PrivacyPolicyPage } from './lib/privacy-policy.page';
import { PrivacyPolicyPageRoutingModule } from './app-privacy-policy-feature.routing';

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
