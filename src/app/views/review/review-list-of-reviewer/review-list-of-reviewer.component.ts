import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-review-list-of-reviewer',
  templateUrl: './review-list-of-reviewer.component.html',
  styleUrls: ['./review-list-of-reviewer.component.css']
})
export class ReviewListOfReviewerComponent implements OnInit {

  user: any;
  reviews: any;
  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.reviewService.findAllReviewsForUser(this.user._id).subscribe(
      (reviews: any) => {
        this.reviews = reviews;
      }
    );
  }

}
