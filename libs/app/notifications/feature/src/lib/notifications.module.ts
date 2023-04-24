import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { notificationsPage } from './notifications.page';
import { NotificationsRouting } from './notifications.routing';
import { NgxsModule } from '@ngxs/store';
import { NotificationsState } from '@mp/app/notifications/data-access';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationsRouting,
    NgxsModule.forFeature([NotificationsState])
  ],
  declarations: [notificationsPage],
  exports: [notificationsPage]

})
export class notificationsPageModule {}
