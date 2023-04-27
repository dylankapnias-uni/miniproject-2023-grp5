import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EditProfilePage } from './lib/edit-profile.page';
import { EditProfilePageRoutingModule } from './app-edit-profile-feature.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfilePageRoutingModule
  ],
  declarations: [EditProfilePage],
  exports: [EditProfilePage]

})
export class EditProfilePageModule {}
