import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectChannelComponent } from './direct-channel.component';

describe('DirectChannelComponent', () => {
  let component: DirectChannelComponent;
  let fixture: ComponentFixture<DirectChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
