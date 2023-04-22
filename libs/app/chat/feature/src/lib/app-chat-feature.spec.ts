import { TestBed } from '@angular/core/testing';
import { ChatPage } from './chat.page';
import { ChatModule } from './chat.module';

describe('ChatComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatModule],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ChatPage);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display the welcome message', () => {
    const fixture = TestBed.createComponent(ChatPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to my app!');
  });
});

describe('HomeModule', () => {
  it('should create the module', () => {
    const module = new ChatModule();
    expect(module).toBeTruthy();
  });
});
