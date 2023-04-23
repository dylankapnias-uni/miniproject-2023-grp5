import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { SettingsState } from './settings.state';
// import { ProfilesApi } from './profiles.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SettingsState]), AuthModule],
  providers: [/*ProfilesApi*/],
})
export class SettingsModule {}