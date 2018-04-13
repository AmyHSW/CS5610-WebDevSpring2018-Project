import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any;
  noUser: boolean;
  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.activatedRoute.params.subscribe((params: any) => {
        this.reviewService.findAllReviewsForProduct(params['productId']).subscribe(
          (reviews: any) => {
            this.reviews = reviews;
            console.log(this.reviews);
          }
        );
      }
    );
  }

}
