import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  userId: String;
  product = {};
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  createProduct() {
    this.productService.createProduct(this.userId, this.product).subscribe(
      (data: any) => {
        this.product = data;
        this.router.navigate(['/product']);
        console.log(this.product);
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
      });
  }

}
