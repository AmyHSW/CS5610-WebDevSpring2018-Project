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
  selectedProducts: [any];
  products: [any];
  searchText: String;
  noUser: boolean;
  isAdmin: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService,
              private productService: ProductService,
              private userService: UserService) { }


  ngOnInit() {
    this.userService.loggedIn().subscribe(
      (isLoggedIn) => {
        this.noUser = !isLoggedIn;
        console.log("isloggedin:" + isLoggedIn);
      }

    );
    this.isAdmin = this.sharedService.user['type'] == 'ADMIN';
    this.productService.findAllProduct().subscribe(
      (products) => {
        products.sort((a, b): number => {
          return b.reviews.length - a.reviews.length;
        })
        this.products = products;
        this.selectedProducts = products.slice(0, 6);
      }
    )
  }

}
