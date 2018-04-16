import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-product-list-business',
  templateUrl: './product-list-business.component.html',
  styleUrls: ['./product-list-business.component.css']
})
export class ProductListBusinessComponent implements OnInit {
  user = {};
  products = [{}];
  userId: String;
  isClick: boolean;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
    this.productService.findAllProductsForUser(this.userId).subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
        }
      );
  }

  editProduct() {
    this.isClick = true;
  }


  updateProduct(productId, product) {
    this.productService.updateProduct(productId, product).subscribe(
      (data: any) => {
        product = data;
        this.router.navigate(['./'], {relativeTo: this.activatedRoute});
        console.log(product);
        this.isClick = false;
      }
    );
  }

}
