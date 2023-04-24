import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EditProfilePage } from './lib/edit-profile.page';
import { EditProfilePageRoutingModule } from './app-edit-profile-feature.routing';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfilePageRoutingModule,
    FormsModule,
    NgxsModule.forFeature([SettingsState])
  ],
  declarations: [EditProfilePage],
  exports: [EditProfilePage]

})
export class EditProfilePageModule {}
