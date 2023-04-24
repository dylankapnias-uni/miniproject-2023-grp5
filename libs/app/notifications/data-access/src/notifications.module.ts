import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { NotificationsState } from './notifications.state';
// import { ProfilesApi } from './profiles.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([NotificationsState]), AuthModule],
  providers: [/*ProfilesApi*/],
})
export class NotficationsModule {}