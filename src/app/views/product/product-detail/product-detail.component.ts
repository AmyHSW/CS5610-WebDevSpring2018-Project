import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {ReviewService} from '../../../services/review.service.client';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: String;
  product = {};
  reviews = [{}];
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.productId = params['productId'];
      }
    );
    this.productService.findProductById(this.productId).subscribe(
      (data: any) => {
        this.product = data;
        console.log(this.product);
      }
    );
    this.reviewService.findAllReviewsForProduct(this.productId).subscribe(
      (data: any) => {
        this.reviews = data;
        console.log(this.reviews);
      }
    );
  }

}
