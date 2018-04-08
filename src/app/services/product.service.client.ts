import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';


@Injectable()
export class ProductService {
  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }


  findAllProduct() {
    const url = this.baseUrl + '/api/product/';

    return this._http.get(url)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  createProduct(userId, product) {
    const url = this.baseUrl + '/api/user/' + userId + '/product';

    return this._http.post(url, product)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findAllProductsForUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId + '/product';
    return this._http.get(url)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findProductById(productId) {
    const url = this.baseUrl + '/api/product/' + productId;
    return this._http.get(url)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateProduct(productId, product) {
    const url = this.baseUrl + '/api/product/' + productId;
    return this._http.put(url, product)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

  deleteProduct(productId) {
    const url = this.baseUrl + '/api/product/' + productId;
    return this._http.delete(url)
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }
}
