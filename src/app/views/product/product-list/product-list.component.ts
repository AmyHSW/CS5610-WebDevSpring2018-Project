import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: [any];
  noUser: boolean;
  constructor(private productService: ProductService,
              private sharedService: SharedService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
    this.productService.findAllProduct().subscribe(
      (products) => {
        this.products = products;
      }
    );

  }

}
