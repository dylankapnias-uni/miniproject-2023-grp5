import { TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatRouting } from './chat.routing';
import { ChatModule } from './chat.module';
import { ChatPage } from './chat.page';

describe('ChatModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        ChatRouting,
        ChatModule,
      ],
      declarations: [ChatPage],
    }).compileComponents();
  }));

  it('should create the chat module', () => {
    const module: ChatModule = TestBed.get(ChatModule);
    expect(module).toBeTruthy();
  });
});
