import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelAddUserComponent } from './channel-add-user.component';

describe('ChannelAddUserComponent', () => {
  let component: ChannelAddUserComponent;
  let fixture: ComponentFixture<ChannelAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
