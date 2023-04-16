import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesState } from './messages.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([MessagesState])],
})
export class AppMessagesDataAccessModule {}
