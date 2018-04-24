import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";
import {ProductService} from "../../../services/product.service.client";
import {ReviewService} from "../../../services/review.service.client";

@Component({
  selector: 'app-product-list-observer',
  templateUrl: './product-list-observer.component.html',
  styleUrls: ['./product-list-observer.component.css']
})
export class ProductListObserverComponent implements OnInit {

  user: any;
  products: any;
  deleteFlag: boolean;
  deleteMsg: String;

  constructor(private userService: UserService,
              private productService: ProductService,
              private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.deleteMsg = 'Successfully deleted favorite product!';
    this.userService.findFavoritesForUser(this.user._id).subscribe(
      (products: any) => {
        this.products = products;
        for (let product of this.products) {
          product.count = 0;
          const lastViewed = product.lastViewed;
          this.reviewService.findAllReviewsForProduct(product._id)
            .subscribe(
              (reviews: any) => {
                // console.log(this.products.indexOf(product));
                for (let review of reviews) {
                  const created = review.dateCreated;
                  if (created > lastViewed) {
                    product.count++;
                  }
                }
              }
            )
        }
      });
  }
  deleteFavorite(productId: String) {
    this.deleteFlag = false;
    this.userService.deleteFavorite(this.user._id, productId)
      .subscribe(
        (data: any) => {
          console.log('deleted favorite');
          this.deleteFlag = true;
          this.userService.findFavoritesForUser(this.user._id).subscribe(
            (products: any) => {
              this.products = products;
            }
          );
        }
      );
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          this.router.navigate(['/']);
        }
      );
  }
  viewProduct(product) {
    product.lastViewed = new Date();
    // console.log(product);
    this.productService.updateProduct(product._id, product)
      .subscribe(
        (data: any) => {
          console.log('updated lastViewed');
          this.router.navigate(['/product', product._id, '0']);
        }
      )
  }
}
