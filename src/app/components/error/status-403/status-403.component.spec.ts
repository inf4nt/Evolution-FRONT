import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Status403Component } from './status-403.component';

describe('Status403Component', () => {
  let component: Status403Component;
  let fixture: ComponentFixture<Status403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Status403Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Status403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
