import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListOfReviewerComponent } from './review-list-of-reviewer.component';

describe('ReviewListOfReviewerComponent', () => {
  let component: ReviewListOfReviewerComponent;
  let fixture: ComponentFixture<ReviewListOfReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewListOfReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListOfReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
