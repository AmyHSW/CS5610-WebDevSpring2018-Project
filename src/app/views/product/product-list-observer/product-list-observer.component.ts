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
      }
    );
  }
  deleteFavorite(productId: String) {
    this.deleteFlag = false;
    this.userService.deleteFavorite(this.user._id, productId)
      .subscribe(
        (data: any) => {
          console.log('deleted favorite');
          this.deleteFlag = true;
        }
      )
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
  viewProduct(productId) {
    this.productService.findProductById(productId)
      .subscribe(
        (product: any) => {
          product.lastViewed = Date.now();
          this.productService.updateProduct(productId, product)
            .subscribe(
              (data: any) => {
                this.router.navigate(['/product', productId]);
              }
            )
          }
        )
  }
  newReviewCount(productId) {
    let count = 0;
    this.productService.findProductById(productId)
      .subscribe(
        (product: any) => {
          const lastViewed = new Date(product.lastViewed);
          this.reviewService.findAllReviewsForProduct(productId)
            .subscribe(
              (reviews: any) => {
                for (let i = 0; i < reviews.length; i++) {
                  const created = new Date(reviews[i].dateCreated);
                  if (created > lastViewed) {
                    count++;
                  }
                }
              }
            )
        }
      );
    return count;
  }
}
