import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Status204Component } from './status-204.component';

describe('Status204Component', () => {
  let component: Status204Component;
  let fixture: ComponentFixture<Status204Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Status204Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Status204Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
