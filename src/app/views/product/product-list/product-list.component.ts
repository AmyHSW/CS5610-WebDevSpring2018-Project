import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: [any];
  noUser: boolean;
  user = {};
  userId: String;
  constructor(private productService: ProductService,
              private sharedService: SharedService,
              private userService: UserService) { }
  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
        console.log(this.noUser);
        if (!this.noUser) {
          this.user = this.sharedService.user;
          this.userId = this.user['_id'];
          console.log(this.noUser, this.userId);
        }
      }
    );
    this.productService.findAllProduct().subscribe(
      (products) => {
        this.products = products;
      }
    );

  }

  addFavorite(productId) {
    this.userService.addFavorite(this.userId, productId);
    alert('successfully add to favorite');
  }

}
