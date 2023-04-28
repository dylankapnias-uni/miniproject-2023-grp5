import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesState } from './messages.state';
import { NgxsModule } from '@ngxs/store';
import { MessagesApi } from './messages.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([MessagesState])],
  providers: [MessagesApi]
})
export class MessagesModule {}