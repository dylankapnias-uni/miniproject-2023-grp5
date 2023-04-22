import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsState } from './settings.state';
import { NgxsModule } from '@ngxs/store';
import { AuthModule } from '@mp/app/auth/data-access';
//import { SettingsService } from 'libs/api/settings/feature/src';
import { SettingsApi } from './settings.api'
@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SettingsState]), AuthModule],
  providers: [SettingsApi]
})
export class SettingsModule {}
