import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AccountState } from './account.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([AccountState])],
})
export class AuthModule {}