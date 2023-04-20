import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesState } from './messages.state';
import { MessagesApi } from './messages.api';
import { NgxsModule } from '@ngxs/store';
import { ChatRepository as ChatTest } from '@mp/api/chat/data-access';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([MessagesState])],
  providers:[MessagesApi]
})
export class AppMessagesDataAccessModule {}
