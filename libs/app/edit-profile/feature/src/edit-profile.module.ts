import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EditProfilePage } from './edit-profile.page';
import { EditProfilePageRoutingModule } from './edit-profile.routing';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from '@mp/app/settings/data-access';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfilePageRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxsModule.forFeature([SettingsState])
  ],
  declarations: [EditProfilePage],
  exports: [EditProfilePage]
})
export class EditProfilePageModule {}
