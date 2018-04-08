import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: any;
  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
        this.reviewService.findAllReviewsForProduct(params['productId']).subscribe(
          (reviews: any) => {
            this.reviews = reviews;
          }
        );
      }
    );
  }

}
