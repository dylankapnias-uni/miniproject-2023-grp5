import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPage } from './messages.page';
import { IonicModule } from '@ionic/angular';
//import { MessagesRouting } from './messages.routing';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MessagesPage],
  exports: [MessagesPage],
})
export class MessagesModule {}