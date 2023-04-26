import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/data-access';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';
import { HomeState } from '@mp/app/home/data-access';
import { NgxsModule } from '@ngxs/store';
import { HomeApi } from '@mp/app/home/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, ProfileModule, HomeRouting, NgxsModule.forFeature([HomeState])],
  declarations: [HomePage],
  providers: [HomeApi],
})
export class HomeModule {}
