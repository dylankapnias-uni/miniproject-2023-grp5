import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPage } from './messages.page';
import { IonicModule } from '@ionic/angular';
import { MessagesRouting } from './messages.routing';
import { NgxsModule } from '@ngxs/store';
import { MessagesState } from 'libs/app/messages/data-access/src/lib/messages.state';
import { MessagesApi } from 'libs/app/messages/data-access/src/lib/messages.api';
@NgModule({
  imports: [CommonModule, IonicModule, MessagesRouting, NgxsModule.forFeature([MessagesState])],
  declarations: [MessagesPage],
  providers: [MessagesApi]
})
export class MessagesModule {}