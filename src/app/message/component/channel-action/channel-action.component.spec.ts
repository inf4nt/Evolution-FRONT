import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelActionComponent } from './channel-action.component';

describe('ChannelActionComponent', () => {
  let component: ChannelActionComponent;
  let fixture: ComponentFixture<ChannelActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
