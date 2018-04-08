import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';

@Component({
  selector: 'app-product-list-business',
  templateUrl: './product-list-business.component.html',
  styleUrls: ['./product-list-business.component.css']
})
export class ProductListBusinessComponent implements OnInit {

  products = [{}];
  userId: String;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
      });
    this.productService.findAllProductsForUser(this.userId).subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
  }

}
