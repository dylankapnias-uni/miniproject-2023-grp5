import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { HomeState } from './home.state';
import { HomeApi } from './home.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([HomeState]), AuthModule],
  providers: [HomeApi],
})
export class HomeModule {}