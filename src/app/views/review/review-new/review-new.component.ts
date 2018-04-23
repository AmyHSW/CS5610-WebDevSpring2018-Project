import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {ProductService} from "../../../services/product.service.client";
import {WalmartService} from "../../../services/walmart.service.client";

@Component({
  selector: 'app-review-new',
  templateUrl: './review-new.component.html',
  styleUrls: ['./review-new.component.css']
})
export class ReviewNewComponent implements OnInit {
  itemId: String;
  product: any;
  user: any;
  review: any;
  productId: String;
  errorFlag: boolean;
  errorMsg: String;
  summaryFlag: boolean;
  summaryAlert: String;
  ratingFlag: boolean;
  ratingAlert: String;
  isFromApi: boolean;

  constructor(private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private productService: ProductService,
              private walmartService: WalmartService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.errorFlag = false;
    this.activatedRoute.params.subscribe((params: any) => {
      this.productId = params['productId'];
      if (this.productId == undefined) {
        this.isFromApi = true;
        this.itemId = params['itemId'];
        this.walmartService.findProductByItemId(this.itemId).subscribe(
          (item) => {
            this.product = {};
            this.product['productName'] = item.name;
            this.product['description'] = item.shortDescription;
            this.product['url'] = item.mediumImage;
            this.product['price'] = item.price;
            this.product['brand'] = item.brand;
          }
        )
      }
    });
    this.review = ReviewService.getNewReview();
  }

  createReview() {
    if (this.isFromApi) {
      this.productService.createProduct(this.user._id, this.product).subscribe(
        (product) => {
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
            this.review._product = product._id;
            this.reviewService.createReview(this.user._id, this.review).subscribe(
              (reviews: any) => {
                console.log('created review');
                this.router.navigate(['/product',product._id, '0']);
              },
              (error: any) => {
                this.errorFlag = true;
                this.errorMsg = error._body;
                console.log(error);
              }
            );
          }
        }
      )
    } else {
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
            this.router.navigate(['../../0'], {relativeTo: this.activatedRoute});
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
}
