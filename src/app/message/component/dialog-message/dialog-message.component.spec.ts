import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInDialogComponent } from './dialog-message.component';

describe('MessageInDialogComponent', () => {
  let component: MessageInDialogComponent;
  let fixture: ComponentFixture<MessageInDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
