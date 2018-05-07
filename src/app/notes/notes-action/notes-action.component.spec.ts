import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesActionComponent } from './notes-action.component';

describe('NotesActionComponent', () => {
  let component: NotesActionComponent;
  let fixture: ComponentFixture<NotesActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
