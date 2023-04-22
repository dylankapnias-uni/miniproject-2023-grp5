import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { ProfileState } from '../profile/profile.state';
import { EditProfileState } from './edit-profile.state';

@NgModule({
    imports: [CommonModule, NgxsModule.forFeature([ProfileState]), AuthModule],
    providers: [ProfilesApi],
  })
export class EditProfileModule {}
