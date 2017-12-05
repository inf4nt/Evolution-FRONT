import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserListComponent } from './dialog-user-list.component';

describe('DialogUserListComponent', () => {
  let component: DialogUserListComponent;
  let fixture: ComponentFixture<DialogUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
