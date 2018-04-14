import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-product-list-observer',
  templateUrl: './product-list-observer.component.html',
  styleUrls: ['./product-list-observer.component.css']
})
export class ProductListObserverComponent implements OnInit {

  user: any;
  products: any;
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userService.findFavoritesForUser(this.user._id).subscribe(
      (products: any) => {
        this.products = products;
      }
    );
  }

  deleteFavorite(productId: String) {
    this.userService.deleteFavorite(this.user._id, productId)
      .subscribe(
        (data: any) => {
          console.log('deleted favorite');
        }
      )
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
          this.router.navigate(['/login']);
        }
      );
  }
}
