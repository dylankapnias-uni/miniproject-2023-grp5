import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostComponent } from './post.component';

@NgModule({
    declarations: [PostComponent],
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [PostComponent],
})
export class PostModule {}