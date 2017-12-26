import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRandomPanelComponent } from './friend-random-panel.component';

describe('FriendRandomPanelComponent', () => {
  let component: FriendRandomPanelComponent;
  let fixture: ComponentFixture<FriendRandomPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRandomPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendRandomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
