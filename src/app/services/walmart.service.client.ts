import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable() // needed as we're injecting Http service into this service
export class WalmartService {

  key = 'fae928nnwy42uvgbm9z6pfvd';
  urlBase = 'http://api.walmartlabs.com/v1/search?apiKey=API_KEY&query=TEXT';

  constructor(private _http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }
}
