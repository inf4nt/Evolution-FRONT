import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTagElementComponent } from './feed-tag-element.component';

describe('FeedTagElementComponent', () => {
  let component: FeedTagElementComponent;
  let fixture: ComponentFixture<FeedTagElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedTagElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTagElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
