import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent, PostModule } from './post';
import { ProfileState, ProfilesApi } from '@mp/app/profile/data-access';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PostModule,
    NgxsModule.forFeature([ProfileState])
  ],
  declarations: [],
  exports: [PostComponent],
  providers: [ProfilesApi]
})
export class CoreModule {}