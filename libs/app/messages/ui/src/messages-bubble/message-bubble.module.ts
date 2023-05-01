import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MessageBubbleComponent } from './message-bubble.component';
import { ChatState, ChatApi } from '@mp/app/chat/data-access';
import { NgxsModule } from '@ngxs/store';

@NgModule({
    declarations: [MessageBubbleComponent],
    imports: [
        CommonModule,
        IonicModule,
        NgxsModule.forFeature([ChatState]),
    ],
    exports: [MessageBubbleComponent],
    providers: [ChatApi],
})
export class MessageBubbleModule {}