import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';


@Injectable()
export class UserService {

  constructor(private http: Http, private router: Router) {
  }

  baseUrl = environment.baseUrl;

  options = new RequestOptions();

  findUserByCredential(username: String, password: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
      .map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  login(username: String, password: String) {

    this.options.withCredentials = true;

    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, this.options)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  register (username, password) {
    const url = this.baseUrl + '/api/register';
    // create an object to keep track of the username and password
    const credentials = {
      username: username,
      password: password,
    };
    // turn on credentials to make sure the communication is secure
    this.options.withCredentials = true;
    // post the url and other staff to passport and convert back with json object
    return this.http.post(url, credentials, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  logout() {
    const url = this.baseUrl + '/api/logout';
    this.options.withCredentials = true;
    return this.http.post(url, {}, this.options)
      .map((response: Response) => {
        return response; // not return a json object
      });
  }

  updateUser(user) {
    const url = this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user).map((response: Response) => {
      return response.json();
    });
  }

  deleteUser(userId) {
    return this.http.delete(this.baseUrl + '/api/user/' + userId)
      .map((response: Response) => {
        return response.json();
      });
  }

  findFollowersForUser(userId) {
    return this.http.get(this.baseUrl + '/api/user/' + userId + '/followers')
      .map((response: Response) => {
        return response.json();
      });
  }

  findFollowingsForUser(userId) {
    return this.http.get(this.baseUrl + '/api/user/' + userId + '/followers')
      .map((response: Response) => {
        return response.json();
      });
  }

  findAllUsers() {
    return this.http.get(this.baseUrl + '/api/user/all')
      .map((response: Response) => {
        return response.json();
      });
  }




}
