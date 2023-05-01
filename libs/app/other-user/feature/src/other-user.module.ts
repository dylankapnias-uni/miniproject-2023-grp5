import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileModule as ProfileDataAccessModule } from '@mp/app/profile/data-access';
import { ProfileModule as ProfileUiModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OtherUserPage } from './other-user.page';
import { OtherUserRouting } from './other-user.routing';
//import { SwiperModule} from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherUserRouting,
    ProfileUiModule,
    ProfileDataAccessModule,
    NgxSkeletonLoaderModule,
   
  ],
  declarations: [OtherUserPage],
})
export class OtherUserModule {}
