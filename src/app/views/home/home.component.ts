import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../services/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service.client";
import {UserService} from "../../services/user.service.client";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: [any];
  searchText: String;
  noUser: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private productService: ProductService,
              private userService: UserService) { }

  searchProducts() {
    this.productService.findProductsByProductName(this.searchText).subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
      }
    );
  }

}
