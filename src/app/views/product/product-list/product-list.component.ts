import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [{}];
  constructor(private productService: ProductService, private sharedService: SharedService) { }

  ngOnInit() {
    this.productService.findAllProduct().subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
  }

}
