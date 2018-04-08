import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class ReviewService {

  constructor(private _http: Http) {}
  baseUrl = environment.baseUrl;

  static getNewReview() {
    return {name: undefined,
      _product: undefined,
      _user: undefined,
      content: undefined,
      summary: undefined,
      rating: undefined};
  }

  createReview(userId: String, review: any) {
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/review', review)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findAllReviewsForProduct(productId: String) {
    return this._http.get(this.baseUrl + '/api/product/' + productId + '/review')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findAllReviewsForUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/review')
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  findReviewById(reviewId: String) {
    return this._http.get(this.baseUrl + '/api/review/' + reviewId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  updateReview(reviewId: String, review: any) {
    return this._http.put(this.baseUrl + '/api/review/' + reviewId, review)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }

  deleteReview(reviewId: String) {
    return this._http.delete(this.baseUrl + '/api/review/' + reviewId)
      .map(
        (res: Response) => {
          return res.json();
        }
      );
  }
}
