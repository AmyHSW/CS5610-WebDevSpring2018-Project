import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewerComponent } from './profile-reviewer.component';

describe('ProfileReviewerComponent', () => {
  let component: ProfileReviewerComponent;
  let fixture: ComponentFixture<ProfileReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
