import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent, PostModule } from './post';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PostModule,
  ],
  declarations: [],
  exports: [PostComponent]
})
export class CoreModule {}