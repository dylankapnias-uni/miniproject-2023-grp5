import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesPage } from './messages.page';

describe('MessagesComponent', () => {
  let component: MessagesPage;
  let fixture: ComponentFixture<MessagesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
