import {Http, Response, Jsonp} from '@angular/http';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable() // needed as we're injecting Http service into this service
export class WalmartService {

  key = 'fae928nnwy42uvgbm9z6pfvd';
  urlBase = 'https://api.walmartlabs.com/v1/search?apiKey=API_KEY&query=TEXT&callback=__ng_jsonp__.__req0.finished';

  constructor(private _http: Http,
              private jsonp: Jsonp) {}

  searchProducts(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    //return this._http.jsonp(url, 'callback');
    return this.jsonp.request(url, { method: 'Get' })
      .subscribe((res) => {
        console.log(res);
      });
  }

  urlItemBase = 'https://api.walmartlabs.com/v1/items/ITEM_ID?apiKey=API_KEY&format=json';
  //541357139
  findProductByItemId(itemId) {
    const url = this.urlItemBase
      .replace('API_KEY', this.key)
      .replace('ITEM_ID', itemId);
    return this._http.get(url);
  }
}
