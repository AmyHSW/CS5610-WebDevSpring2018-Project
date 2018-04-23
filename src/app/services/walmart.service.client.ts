import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable() // needed as we're injecting Http service into this service
export class WalmartService {

  key = 'fae928nnwy42uvgbm9z6pfvd';
  urlBase = 'http://api.walmartlabs.com/v1/search?apiKey=API_KEY&query=TEXT';

  constructor(private _http: Http) {}

  searchProducts(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

  urlItemBase = 'http://api.walmartlabs.com/v1/items/ITEM_ID?apiKey=API_KEY&format=json';
  //541357139
  findProductByItemId(itemId) {
    const url = this.urlItemBase
      .replace('API_KEY', this.key)
      .replace('ITEM_ID', itemId);
    return this._http.get(url);
  }
}
