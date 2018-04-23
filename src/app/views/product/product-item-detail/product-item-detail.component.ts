import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../../../services/review.service.client";
import {ProductService} from "../../../services/product.service.client";
import {SharedService} from "../../../services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";
import {WalmartService} from "../../../services/walmart.service.client";

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  itemId: String;
  product: any;
  isReviewer: boolean;
  isObserver: boolean;
  noUser: boolean;
  user : any;
  userId: String;
  favorites = [];
  length: Number;
  isAdmin: boolean;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService, private reviewService: ReviewService,
              private userService: UserService,
              private walmartService: WalmartService) { }

  ngOnInit() {
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
        this.user = this.sharedService.user;
        this.userId = this.user['_id'];
        this.isReviewer = (this.user['type'] === 'REVIEWER');
        this.isObserver = (this.user['type'] === 'OBSERVER');
      }
    );
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.itemId = params['itemId'];
        this.walmartService.findProductByItemId(this.itemId).subscribe(
          (item) => {
            this.product = {};
            this.product['productName'] = item.name;
            this.product['description'] = item.shortDescription;
            this.product['url'] = item.mediumImage;
            this.product['price'] = item.salePrice;
            this.product['brand'] = item.brand;
          }
        )
      }
    );
  }

  clickFavoriteButton() {
    this.productService.createProduct(this.userId, this.product).subscribe(
      (product) => {
        this.userService.addFavorite(this.userId, product._id).subscribe();
        alert('successfully add to favorite');
        this.router.navigate(['/product',product._id,'0']);
      }
    )
  }

}
