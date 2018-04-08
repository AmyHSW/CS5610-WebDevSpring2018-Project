import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: String;
  userId: String;
  products = [{}];
  product: {};
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe(
      (product: any) => {
        this.product = product;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      }
    );
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (data: any) => {
        this.product = data;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        console.log(this.product);
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
        this.productId = params['productId'];
      }
    );
    this.productService.findProductById(this.productId).subscribe(
      (data: any) => {
        this.product = data;
      }
    );

    this.productService.findAllProductsForUser(this.userId).subscribe(
      (data: any) => {
        this.products = data;
      }
    );
  }

}
