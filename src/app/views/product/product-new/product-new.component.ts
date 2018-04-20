import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';
import {UserService} from '../../../services/user.service.client';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  user = {};
  userId: String;
  product = {};
  baseUrl = environment.baseUrl;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService, private userService: UserService) { }

  createProduct() {
    this.productService.createProduct(this.userId, this.product).subscribe(
      (data: any) => {
        this.product = data;
        this.router.navigate(['/user/product']);
        console.log(this.product);
      }
    );
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.userId = this.user['_id'];
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => {
          this.sharedService.user = '';
        }
      );
  }
}
