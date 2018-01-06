import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessageUserListComponent } from './direct-message-list.component';

describe('DirectMessageUserListComponent', () => {
  let component: DirectMessageUserListComponent;
  let fixture: ComponentFixture<DirectMessageUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMessageUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMessageUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
