import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPage } from './chat.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
//import { ChatRouting } from './chat.routing';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule ],
  declarations: [ChatPage],
  exports:[ChatPage]
})
export class ChatModule {}