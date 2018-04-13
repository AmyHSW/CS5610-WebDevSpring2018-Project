import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-review-new',
  templateUrl: './review-new.component.html',
  styleUrls: ['./review-new.component.css']
})
export class ReviewNewComponent implements OnInit {

  noUser: boolean;
  user: any;
  review: any;
  productId: String;
  errorFlag: boolean;
  errorMsg: String;
  summaryFlag: boolean;
  summaryAlert: String;
  ratingFlag: boolean;
  ratingAlert: String;

  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.user = this.sharedService.user;
    this.errorFlag = false;
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params['productId'];
    });
    this.review = ReviewService.getNewReview();
  }

  createReview() {
    this.summaryFlag = false;
    this.ratingFlag = false;
    if (this.review.summary === undefined || this.review.summary === '') {
      this.summaryFlag = true;
      this.summaryAlert = '* Please enter summary';
    } else if (this.review.rating === undefined || this.review.rating === ''
      || this.review.rating < 0 || this.review.rating > 5) {
      this.ratingFlag = true;
      this.ratingAlert = '* Please enter rating: 0.0 - 5.0';
    } else {
      this.review._product = this.productId;
      this.reviewService.createReview(this.user._id, this.review).subscribe(
        (reviews: any) => {
          console.log('created review');
          this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMsg = error._body;
          console.log(error);
        }
      );
    }
  }
}
