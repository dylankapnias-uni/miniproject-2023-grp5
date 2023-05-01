import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { notificationsPage } from './notifications.page';
import { notificationsPageRoutingModule } from './notifications.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    notificationsPageRoutingModule
  ],
  declarations: [notificationsPage],
  exports: [notificationsPage]

})
export class notificationsPageModule {}
