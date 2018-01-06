import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMessageListComponent } from './channel-message-list.component';

describe('ChannelMessageListComponent', () => {
  let component: ChannelMessageListComponent;
  let fixture: ComponentFixture<ChannelMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
