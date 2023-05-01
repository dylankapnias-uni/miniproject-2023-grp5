import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './user.state';
import { UserApi } from './user.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserState]), AuthModule],
  providers: [UserApi],
})
export class UserModule {}