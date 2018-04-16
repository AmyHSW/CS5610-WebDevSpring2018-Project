import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {ReviewService} from '../../../services/review.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: String;
  product = {};
  reviews = [{}];
  isReviewer: boolean;
  isObserver: boolean;
  isFavorite: boolean;
  user = {};
  userId: String;
  favorites = [{}];
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService, private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.productId = params['productId'];
      }
    );
    this.productService.findProductById(this.productId).subscribe(
      (data: any) => {
        this.product = data;

      }
    );
    this.reviewService.findAllReviewsForProduct(this.productId).subscribe(
      (data: any) => {
        this.reviews = data;

      }
    );
    this.userService.findFavoritesForUser(this.userId).subscribe(
      (data: any) => {
        this.favorites = data;
        console.log(this.favorites);
        for (const favorite of this.favorites) {
          if ((favorite['_id']) === this.productId) {
            this.isFavorite = true;
          }
        }
      }
    );
    this.isReviewer = (this.user['type'] === 'REVIEWER');
    this.isObserver = (this.user['type'] === 'OBSERVER');
  }

  clickFavoriteButton() {
    console.log(this.isFavorite);
    console.log(this.isFavorite === true);
    if (this.isFavorite) {
      this.userService.deleteFavorite(this.userId, this.productId).subscribe(
        (data: any) => {
          alert('successfully delete from favorite');
          this.isFavorite = false;
        }
      );
    } else {
      console.log(this.userId, this.productId);
      this.userService.addFavorite(this.userId, this.productId).subscribe();
      this.isFavorite = true;
      alert('successfully add to favorite');
    }
  }
}
