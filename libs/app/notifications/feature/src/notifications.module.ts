import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { notificationsPage } from './notifications.page';
import { NotificationsRouting } from './notifications.routing';
import { NgxsModule } from '@ngxs/store';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
import { NotificationsState, NotificationsApi } from '@mp/app/notifications/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationsRouting,
    NgxsModule.forFeature([NotificationsState, ProfileState])
  ],
  declarations: [notificationsPage],
  exports: [notificationsPage],
  providers: [NotificationsApi, ProfilesApi]

})
export class notificationsPageModule {}
